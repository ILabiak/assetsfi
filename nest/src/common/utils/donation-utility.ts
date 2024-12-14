import * as fs from 'fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

interface Result {
  orgName?: string;
  orgLogo: string;
  addresses: Array<object>;
  link: string;
}

export async function calculateDonationsStats(donations) {
  const result = {
    totalDonated: 0,
    biggestDonation: {
      amountInUsd: 0,
    },
    donations: donations,
    favouriteFoundation: {},
  };

  const foundations = {};

  for (const donation of donations) {
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
  const foundationKeys = Object.keys(foundations);
  if (foundationKeys.length == 0) {
    result.favouriteFoundation = {};
  } else if (foundationKeys.length == 1) {
    result.favouriteFoundation = foundations[foundationKeys[0]];
  } else {
    let favFoundationKey = foundationKeys[0];
    for (const key of foundationKeys) {
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
}

export async function parseFoundationAddresses() {
  const dataPath = path.resolve('./src/common/utils', 'foundations-data.json');
  let foundationsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  // if (
  //   foundationsData.updatedAt &&
  //   Date.now() - foundationsData.updatedAt < 24 * 60 * 60 * 1000 //24 hours
  // ) {
  //   return foundationsData;
  // }
  try {
    const [slRes, prRes, ptRes] = await Promise.all([
      parseSaveLifeFoundation(),
      parsePritulaFoundation(),
      parseSternenkoFoundation(),
    ]);
    const results = [slRes, prRes, ptRes].filter(
      (res): res is Result => res?.orgName !== undefined,
    );
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
}

const parseSaveLifeFoundation = async () => {
  const result = {
    orgName: 'Come Back Alive',
    orgLogo:
      'https://raw.githubusercontent.com/ILabiak/uno-project/refs/heads/main/public/comebackalive.svg',
    addresses: [
      {
        currencyType: 'Bitcoin',
        walletAddresses: ['bc1qkd5az2ml7dk5j5h672yhxmhmxe9tuf97j39fm6'],
      },
      {
        currencyType: 'Ethereum',
        walletAddresses: [
          '0xa1b1bbB8070Df2450810b8eB2425D543cfCeF79b',
          '0x93Bda139023d582C19D70F55561f232D3CA6a54c',
        ],
      },
      {
        currencyType: 'Tether (TRC20)',
        walletAddresses: ['TX9aNri16bSxVYi6oMnKDj5RMKAMBXWzon'],
      },
    ],
    link: 'https://savelife.in.ua/donate/#donate-army-crypto',
  };
  return result;
  const response = await fetch(result.link);
  const body = await response.text();
  console.log(body);
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
      const walletAddresses = [];

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
};

const parsePritulaFoundation = async () => {
  const result: Result = {
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
};

const parseSternenkoFoundation = async () => {
  const result: Result = {
    orgName: 'Serhiy Sternenko (FPV drones)',
    orgLogo:
      'https://raw.githubusercontent.com/ILabiak/uno-project/refs/heads/main/public/drone-svgrepo-com.svg',
    addresses: [],
    link: 'https://t.me/ssternenko/22022',
  };
  const walletInfo = [];

  const response = await fetch(result.link);
  const body = await response.text();

  const $ = cheerio.load(body);

  let description = $('meta[property="og:description"]').attr('content');

  if (description.length < 10) {
    return;
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
};
