const cheerio = require('cheerio');
const fs = require('fs');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

let testData = [
  {
    id: '14',
    userId: 'google-oauth2|116450147994105467130',
    foundationId: 1,
    amount: 430,
    date: '2024-04-04T13:52:36.000Z',
    description: 'sdf',
    currencyId: '3',
    amountInUsd: 10.99994,
    createdAt: '2024-04-04T13:52:44.480Z',
    updatedAt: '2024-04-04T13:52:53.275Z',
    Foundation: {
      id: '1',
      name: 'Come Back Alive',
      logoUrl:
        'https://savelife.in.ua/wp-content/themes/savelife/assets/images/new-logo-en.svg',
      createdAt: '2024-04-02T11:35:14.641Z',
      updatedAt: '2024-04-02T11:35:14.641Z',
    },
    Currency: {
      id: 3,
      name: 'UAH',
      code: 'uah',
      symbol: '₴',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
  },
  {
    id: '9',
    userId: 'google-oauth2|116450147994105467130',
    foundationId: null,
    amount: 1,
    date: '2024-04-03T17:17:26.000Z',
    description: '',
    currencyId: '1',
    amountInUsd: 1,
    createdAt: '2024-04-03T17:17:33.875Z',
    updatedAt: '2024-04-03T17:17:33.875Z',
    Foundation: null,
    Currency: {
      id: 1,
      name: 'USD',
      code: 'usd',
      symbol: '$',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
  },
  {
    id: '8',
    userId: 'google-oauth2|116450147994105467130',
    foundationId: null,
    amount: 1,
    date: '2024-04-03T17:08:43.000Z',
    description: '',
    currencyId: '1',
    amountInUsd: 1,
    createdAt: '2024-04-03T17:10:28.138Z',
    updatedAt: '2024-04-03T17:10:28.138Z',
    Foundation: null,
    Currency: {
      id: 1,
      name: 'USD',
      code: 'usd',
      symbol: '$',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
  },
  {
    id: '7',
    userId: 'google-oauth2|116450147994105467130',
    foundationId: 1,
    amount: 10,
    date: '2024-04-02T16:58:19.000Z',
    description: 'sdf',
    currencyId: '2',
    amountInUsd: 10.7691,
    createdAt: '2024-04-03T17:01:32.055Z',
    updatedAt: '2024-04-03T17:01:32.055Z',
    Foundation: {
      id: '1',
      name: 'Come Back Alive',
      logoUrl:
        'https://savelife.in.ua/wp-content/themes/savelife/assets/images/new-logo-en.svg',
      createdAt: '2024-04-02T11:35:14.641Z',
      updatedAt: '2024-04-02T11:35:14.641Z',
    },
    Currency: {
      id: 2,
      name: 'EUR',
      code: 'eur',
      symbol: '€',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
  },
  {
    id: '6',
    userId: 'google-oauth2|116450147994105467130',
    foundationId: null,
    amount: 3934,
    date: '2024-04-02T12:45:22.739Z',
    description: 'Third donation',
    currencyId: '3',
    amountInUsd: 100,
    createdAt: '2024-04-02T12:45:22.739Z',
    updatedAt: '2024-04-02T12:45:22.739Z',
    Foundation: null,
    Currency: {
      id: 3,
      name: 'UAH',
      code: 'uah',
      symbol: '₴',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
  },
  {
    id: '5',
    userId: 'google-oauth2|116450147994105467130',
    foundationId: 2,
    amount: 393.4,
    date: '2024-04-02T12:45:02.469Z',
    description: 'Second donation',
    currencyId: '3',
    amountInUsd: 10,
    createdAt: '2024-04-02T12:45:02.469Z',
    updatedAt: '2024-04-02T12:45:02.469Z',
    Foundation: {
      id: '2',
      name: 'Serhiy Prytula Charity Foundation',
      logoUrl: 'https://ds7zgdsyui79p.cloudfront.net/logonew_f2314490c6.svg',
      createdAt: '2024-04-02T11:36:00.993Z',
      updatedAt: '2024-04-02T11:36:00.993Z',
    },
    Currency: {
      id: 3,
      name: 'UAH',
      code: 'uah',
      symbol: '₴',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
  },
  {
    id: '10',
    userId: 'google-oauth2|116450147994105467130',
    foundationId: 3,
    amount: 2,
    date: '2024-03-11T18:17:34.000Z',
    description: '',
    currencyId: '3',
    amountInUsd: 0.0508,
    createdAt: '2024-04-03T17:17:50.005Z',
    updatedAt: '2024-04-03T17:17:50.005Z',
    Foundation: {
      id: '3',
      name: 'Serhiy Sternenko',
      logoUrl: 'https://svgshare.com/i/14uM.svg',
      createdAt: '2024-04-02T11:36:57.455Z',
      updatedAt: '2024-04-02T11:36:57.455Z',
    },
    Currency: {
      id: 3,
      name: 'UAH',
      code: 'uah',
      symbol: '₴',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
  },
];

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

    // Push the currencyType and walletAddress as an object to the array
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
  // console.log(result);
  return result;
};

// (async () => {
//   // console.time('Execution time:');
//   // console.log(await parseFoundationAddresses());
//   // calculateDonationsStats(testData);
//   // console.timeEnd('Execution time:');
// })();

module.exports = {
  parseFoundationAddresses,
  calculateDonationsStats,
};
