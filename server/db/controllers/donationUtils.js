const cheerio = require('cheerio');
const fs = require('fs');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


const parseFoundationAddresses = async () => {
  let foundationsData = require('./foundations-data.json');
  if (
    foundationsData.updatedAt &&
    Date.now() - foundationsData.updatedAt < 24 * 60 * 60 * 1000 //24 hours
  ) {
    console.log('Using cashed data');
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
    fs.writeFileSync(
      './foundations-data.json',
      JSON.stringify(foundationsData)
    );
    return foundationsData;
  } catch (error) {
    console.error('Error parsing foundation addresses:', error);
    return {error};
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
  //   console.log(cryptoAddresses.html());
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
    // Extract currencyType and walletAddress from the match groups
    let currencyType = match[1];
    const walletAddress = match[2];
    const walletAddresses = [walletAddress]

    if (currencyType.includes('USDT (TRC20)')) {
      currencyType = 'Tether (TRC20)';
    }
    if (currencyType.includes('Ethereum (ERC20):')) {
      currencyType = 'Ethereum';
    }
    if (currencyType.includes('USDT (TRC20)')) {
      currencyType = 'Tether (TRC20)';
    }



    // Push the currencyType and walletAddress as an object to the array
    walletInfo.push({ currencyType, walletAddresses });
  }

  if (walletInfo[0]) {
    result.addresses = walletInfo;
    return result;
  }
  return {};
};

// (async () => {
//   console.time('Execution time:');
//   console.log(await parseFoundationAddresses());
//   console.timeEnd('Execution time:');
// })();

module.exports = {
  parseFoundationAddresses
}