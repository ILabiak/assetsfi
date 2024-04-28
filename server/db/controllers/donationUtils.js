const cheerio = require('cheerio');
const fs = require('fs');
const path = require('node:path');
require('dotenv').config();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { getCurrencyRate } = require('./utils');

const parseFoundationAddresses = async () => {
  let dataPath = path.resolve(__dirname, 'foundations-data.json');
  let foundationsData = require(dataPath);
  if (
    foundationsData.updatedAt &&
    Date.now() - foundationsData.updatedAt < 24 * 60 * 60 * 1000 //24 hours
  ) {
    return foundationsData;
  }
  try {
    const [slRes, prRes, ptRes] = await Promise.all([
      parseSaveLifeFoundation(),
      parsePritulaFoundation(),
      parseSternenkoFoundation(),
    ]);
    const results = [slRes, prRes, ptRes].filter((res) => res.orgName);
    foundationsData = {
      updatedAt: Date.now(),
      data: results,
    };
    fs.writeFileSync(dataPath, JSON.stringify(foundationsData));
    return foundationsData;
  } catch (error) {
    console.error('Error parsing foundation addresses:', error);
    return { error };
  }
};

const parseSaveLifeFoundation = async () => {
  let result = {
    orgName: 'Come Back Alive',
    orgLogo:
      'https://savelife.in.ua/wp-content/themes/savelife/assets/images/new-logo-en.svg',
    addresses: [],
    link: 'https://savelife.in.ua/donate/#donate-army-crypto',
  };

  const response = await fetch(result.link);
  const body = await response.text();

  const $ = cheerio.load(body);

  const cryptoAddresses = $('.tab-pane#donate-army-crypto');
  const parentElements = cryptoAddresses.find('.currency-icon').parent();

  const walletInfo = parentElements
    .map((index, element) => {
      const currencyIconSrc = $(element).find('.currency-icon').attr('src');
      let currencyType = '';

      if (currencyIconSrc.includes('icon-btc')) {
        currencyType = 'Bitcoin';
      } else if (currencyIconSrc.includes('eth.svg')) {
        currencyType = 'Ethereum';
      } else if (currencyIconSrc.includes('tether.svg')) {
        currencyType = 'Tether (TRC20)';
      } else if (currencyIconSrc.includes('sol.svg')) {
        currencyType = 'Solana';
      }
      let walletAddresses = [];

      if (currencyType === 'Ethereum') {
        $(element)
          .next('div')
          .find('.fw-bold.text-break.mb-1')
          .each((index, addressElement) => {
            const address = $(addressElement).text().trim();
            walletAddresses.push(address);
          });
      } else {
        const walletAddress = $(element)
          .next('div')
          .find('.fw-bold.text-break.mb-1')
          .text()
          .trim();
        walletAddresses.push(walletAddress);
      }

      return { currencyType, walletAddresses };
    })
    .get();

  if (walletInfo[0]) {
    result.addresses = walletInfo;
    return result;
  }
  return {};
};

const parsePritulaFoundation = async () => {
  let result = {
    orgName: 'Serhiy Prytula Charity Foundation',
    orgLogo: 'https://ds7zgdsyui79p.cloudfront.net/logonew_f2314490c6.svg',
    addresses: [],
    link: 'https://prytulafoundation.org/donation',
  };
  const walletInfo = [];

  const response = await fetch(result.link);
  const body = await response.text();

  const $ = cheerio.load(body);

  const parentElements = $('.donation-field');

  parentElements.each((index, element) => {
    let currencyType = $(element).find('.donation-field__label').text().trim();
    if (currencyType.includes('Bitcoin')) {
      currencyType = 'Bitcoin';
    } else if (currencyType.includes('ETH')) {
      currencyType = 'Ethereum';
    } else if (currencyType.includes('USDT (TRC20)')) {
      currencyType = 'Tether (TRC20)';
    } else {
      return;
    }
    const walletAddress = $(element)
      .find('.donation-field__text')
      .text()
      .trim();

    if (walletAddress) {
      const walletAddresses = walletAddress
        .split('\n')
        .map((addr) => addr.trim());
      walletInfo.push({ currencyType, walletAddresses });
    }
  });

  if (walletInfo[0]) {
    result.addresses = walletInfo;
    return result;
  }
  return {};
};

const parseSternenkoFoundation = async () => {
  let result = {
    orgName: 'Serhiy Sternenko (FPV drones)',
    orgLogo: 'https://svgshare.com/i/14uM.svg',
    addresses: [],
    link: 'https://t.me/ssternenko/22022',
  };
  const walletInfo = [];

  const response = await fetch(result.link);
  const body = await response.text();

  const $ = cheerio.load(body);

  let description = $('meta[property="og:description"]').attr('content');

  if (description.length < 10) {
    return {};
  }

  const firstIndex = description.indexOf('USDT');
  const lastIndex = description.indexOf('❗️❗️❗️');
  description = description.slice(firstIndex, lastIndex);

  const regex = /(.+?)\s*(?::|\n)([\w\d]+)\s*/g;

  let match;
  while ((match = regex.exec(description)) !== null) {
    let currencyType = match[1];
    const walletAddress = match[2];
    const walletAddresses = [walletAddress];

    if (currencyType.includes('USDT (TRC20)')) {
      currencyType = 'Tether (TRC20)';
    }
    if (currencyType.includes('Ethereum (ERC20):')) {
      currencyType = 'Ethereum';
    }
    if (currencyType.includes('USDT (TRC20)')) {
      currencyType = 'Tether (TRC20)';
    }

    walletInfo.push({ currencyType, walletAddresses });
  }

  if (walletInfo[0]) {
    result.addresses = walletInfo;
    return result;
  }
  return {};
};

const calculateDonationsStats = (donations) => {
  const result = {
    totalDonated: 0,
    biggestDonation: {
      amountInUsd: 0,
    },
    donations: donations,
  };

  let foundations = {};

  for (let donation of donations) {
    result.totalDonated += donation.amountInUsd;
    if (result.biggestDonation.amountInUsd < donation.amountInUsd) {
      result.biggestDonation = donation;
    }
    if (foundations[donation.foundationId]) {
      foundations[donation.foundationId].amount += donation.amountInUsd;
    } else {
      foundations[donation.foundationId] = {
        ...donation['Foundation'],
        amount: donation.amountInUsd,
      };
    }
  }
  let foundationKeys = Object.keys(foundations);
  if (foundationKeys.length == 0) {
    result.favouriteFoundation = {};
  } else if (foundationKeys.length == 1) {
    result.favouriteFoundation = foundations[foundationKeys[0]];
  } else {
    let favFoundationKey = foundationKeys[0];
    for (let key of foundationKeys) {
      if (
        foundations[favFoundationKey].amount < foundations[key].amount &&
        key != 'null'
      ) {
        favFoundationKey = key;
      }
    }
    result.favouriteFoundation = foundations[favFoundationKey];
  }
  return result;
};

const checkWalletAddress = async (networkCode, address) => {
  const url = `https://api.3xpl.com/search?q=${address}&from=all&in=address&token=${process.env.XPL_API_KEY}`;

  const response = await fetch(url);
  let results = await response.json();

  if (!results.data?.results) return false;
  return results.data.results[networkCode]?.address ? true : false;
};

const getAddressData = async (data) => {
  if (!data.address || !data['SupportedNetwork']?.code) {
    return;
  }
  let result = {
    ...data,
    balance: 0,
    tokens: [],
    symbols: [],
  };
  const url = `https://api.3xpl.com/${data['SupportedNetwork']?.code}/address/${data.address}?data=address,balances,events,mempool&from=all&library=currencies,rates(usd)&token=${process.env.XPL_API_KEY}`;

  const response = await fetch(url);
  let results = await response.json();
  if (!results.data.balances) {
    return result;
  }

  let rate = await getCurrencyRate(data['Currency'].code, 'usd');

  Object.entries(results.data.balances).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        let token = results.library.currencies[nestedKey];
        let price = results.library.rates.now[nestedKey];
        if (price.usd == null) {
          return;
        }

        let balance =
          (price.usd * rate * parseFloat(nestedValue.balance)) /
          Math.pow(10, token.decimals);
        if (balance <= 0.1) {
          return;
        }
        result.balance += balance;
        result.symbols.push(token.symbol);
        result.tokens.push({
          tokens: (
            parseFloat(nestedValue.balance) / Math.pow(10, token.decimals)
          ).toFixed(5),
          balance: balance.toFixed(5),
          name: token.name,
          symbol: token.symbol,
          events: nestedValue.events,
          price: price.usd * rate,
        });
      });
    }
  });

  return result;
};

const getTokensMetadata = async (addresses) => {
  let useCashedMetadata = true;
  let dataPath = path.resolve(__dirname, 'coins-metadata.json');
  let metaDataText = fs.readFileSync(dataPath, 'utf8');
  let metaData = JSON.parse(metaDataText);
  if (
    !metaData.updatedAt ||
    !metaData.data ||
    Date.now() - metaData.updatedAt > 7 * 24 * 60 * 60 * 1000 // 7 days
  ) {
    useCashedMetadata = false;
  }

  let symbolsArr = [];
  if (!addresses) {
    return {};
  }
  for (let el of addresses) {
    symbolsArr.push(...el.symbols);
    for (let symbol of el.symbols) {
      if (!metaData.data || !metaData.data[symbol]) {
        useCashedMetadata = false;
      }
    }
  }
  if (symbolsArr.length < 1) {
    return {};
  }

  let metadataRes;

  if (useCashedMetadata) {
    return metaData.data;
  }

  const symbols = [...new Set(symbolsArr)].join(',');
  let metadataReqLink = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbols}&aux=logo&CMC_PRO_API_KEY=${process.env.CMC_API_KEY}`;
  try {
    const response = await fetch(metadataReqLink);
    metadataJson = await response.json();
  } catch (err) {
    console.log(err);
    return [err];
  }
  if (!metadataJson.data) {
    return { error: 'Could not get metadata' };
  }
  if (metaData.data) {
    metadataRes = {
      updatedAt: Date.now(),
      data: { ...metaData.data, ...metadataJson.data },
    };
  } else {
    metadataRes = {
      updatedAt: Date.now(),
      data: metadataJson.data,
    };
  }
  fs.writeFileSync(dataPath, JSON.stringify(metadataRes));
  return metadataJson.data.map;
};

module.exports = {
  parseFoundationAddresses,
  calculateDonationsStats,
  checkWalletAddress,
  getAddressData,
  getTokensMetadata,
};
