const cheerio = require('cheerio');
const fs = require('fs');
const path = require('node:path');
require('dotenv').config();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const parseFoundationAddresses = async () => {
  let dataPath = path.resolve(__dirname, 'foundations-data.json');
  let foundationsData = require(dataPath);
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

const checkWalletAddress = async (networkCode, address) => {
  const url = `https://api.3xpl.com/search?q=${address}&from=all&in=address&token=${process.env.XPL_API_KEY}`;

  const response = await fetch(url);
  let results = await response.json();

  return results.data.results[networkCode]?.address ? true : false;
};

const testData = {
  data: {
    address: {
      address: 'TKAoHbqcc3qnDdvfobYFRZ9daBU6yAsEFW',
      balances: {
        'tron-main': 1,
        'tron-trc-10': 2,
        'tron-trc-20': 1,
        'tron-trc-721': 0,
        'tron-trc-1155': 0,
      },
      events: {
        'tron-main': null,
        'tron-internal': null,
        'tron-trc-10': null,
        'tron-trc-20': null,
        'tron-trc-721': null,
        'tron-trc-1155': null,
      },
    },
    balances: {
      'tron-main': {
        tron: {
          balance: '102251824',
          events: null,
        },
      },
      'tron-trc-10': {
        'tron-trc-10/1005011': {
          balance: '8888888',
          events: null,
        },
        'tron-trc-10/1005027': {
          balance: '8888880000',
          events: null,
        },
      },
      'tron-trc-20': {
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          balance: '1925766007',
          events: null,
        },
      },
      'tron-trc-721': [],
      'tron-trc-1155': [],
    },
    events: {
      'tron-main': [
        {
          block: 60266511,
          transaction:
            '707fb3ac26fee7dd0cc9aba2497f5cfa311d07cac673900c0bfac15084187e67',
          sort_key: 441,
          time: '2024-03-26T08:11:06.000000Z',
          currency: 'tron',
          effect: '+3',
          failed: false,
          extra: 't',
          extra_indexed: null,
        },
        {
          block: 60266509,
          transaction:
            '66b52a7bd73e49bdcaa7376ff94ac5267320646e97cfd39ff5654e906ee4d636',
          sort_key: 153,
          time: '2024-03-26T08:11:00.000000Z',
          currency: 'tron',
          effect: '+1',
          failed: false,
          extra: 't',
          extra_indexed: null,
        },
        {
          block: 60266495,
          transaction:
            'b3ed96cf5dddab31cfaa0cdbdfe8772910a668bdd755f0a94b6f82e99200d5fd',
          sort_key: 241,
          time: '2024-03-26T08:10:18.000000Z',
          currency: 'tron',
          effect: '+0',
          failed: false,
          extra: 'ta',
          extra_indexed: null,
        },
        {
          block: 60266488,
          transaction:
            '9dbc5dcb185fd789ab05aaa9b798b86139467b41ec577559d56ca6d0138ba85b',
          sort_key: 203,
          time: '2024-03-26T08:09:57.000000Z',
          currency: 'tron',
          effect: '+5',
          failed: false,
          extra: 't',
          extra_indexed: null,
        },
        {
          block: 60266486,
          transaction:
            '6f0164ef7ecc33b6134ad7d4695528b5fbab5f9a13153483035c5167678139de',
          sort_key: 38,
          time: '2024-03-26T08:09:51.000000Z',
          currency: 'tron',
          effect: '-70000000',
          failed: false,
          extra: 't',
          extra_indexed: null,
        },
        {
          block: 60266486,
          transaction:
            '6f0164ef7ecc33b6134ad7d4695528b5fbab5f9a13153483035c5167678139de',
          sort_key: 36,
          time: '2024-03-26T08:09:51.000000Z',
          currency: 'tron',
          effect: '-1100000',
          failed: false,
          extra: 'b',
          extra_indexed: null,
        },
        {
          block: 59994342,
          transaction:
            'ce386f0233de48600e87b3e078bbdc26eee2d14c056b63700886a0fef88062c7',
          sort_key: 323,
          time: '2024-03-16T21:15:36.000000Z',
          currency: 'tron',
          effect: '+1',
          failed: false,
          extra: 't',
          extra_indexed: null,
        },
        {
          block: 59994337,
          transaction:
            '27c605bce63514f1a1ad8c7382714d98b989c42c777f64b0495d3f307b9395c1',
          sort_key: 204,
          time: '2024-03-16T21:15:21.000000Z',
          currency: 'tron',
          effect: '-0',
          failed: false,
          extra: 'tsc',
          extra_indexed: null,
        },
        {
          block: 59994337,
          transaction:
            '27c605bce63514f1a1ad8c7382714d98b989c42c777f64b0495d3f307b9395c1',
          sort_key: 202,
          time: '2024-03-16T21:15:21.000000Z',
          currency: 'tron',
          effect: '-27255900',
          failed: false,
          extra: 'b',
          extra_indexed: null,
        },
        {
          block: 57371914,
          transaction:
            'e6cd68d4af007b6b2f094576d4025b2eae930c3b62a354645dfff417bc6361ff',
          sort_key: 284,
          time: '2023-12-16T17:49:18.000000Z',
          currency: 'tron',
          effect: '-0',
          failed: false,
          extra: 'tsc',
          extra_indexed: null,
        },
      ],
      'tron-internal': [],
      'tron-trc-10': [
        {
          block: 60266495,
          transaction:
            'b3ed96cf5dddab31cfaa0cdbdfe8772910a668bdd755f0a94b6f82e99200d5fd',
          sort_key: 13,
          time: '2024-03-26T08:10:18.000000Z',
          currency: 'tron-trc-10/1005027',
          effect: '+8888880000',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
        {
          block: 56178843,
          transaction:
            'efc42d11c4fc62842b34feefbdddccec70f6eaf1201259282bf4d6574c65f7b4',
          sort_key: 29,
          time: '2023-11-05T07:15:48.000000Z',
          currency: 'tron-trc-10/1005011',
          effect: '+8888888',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
      ],
      'tron-trc-20': [
        {
          block: 60647976,
          transaction:
            '3fe75e30f0c3fc5b4a59828ce45ab4ee6f9db847d27ece83097114951423c82e',
          sort_key: 5,
          time: '2024-04-08T14:10:09.000000Z',
          currency: 'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
          effect: '+250511225',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
        {
          block: 60238068,
          transaction:
            '00823e0e39fb0fbc64ff173c94886e53eb5695fdd91f354d92b6525a1cd6d0f4',
          sort_key: 45,
          time: '2024-03-25T08:28:15.000000Z',
          currency: 'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
          effect: '+221000000',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
        {
          block: 59994337,
          transaction:
            '27c605bce63514f1a1ad8c7382714d98b989c42c777f64b0495d3f307b9395c1',
          sort_key: 50,
          time: '2024-03-16T21:15:21.000000Z',
          currency: 'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
          effect: '-1000000000',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
        {
          block: 59348067,
          transaction:
            '9a9ec516be41eca1d9c785dc69ae0814a33a9990873553613ed63147c0073b2a',
          sort_key: 7,
          time: '2024-02-23T09:10:42.000000Z',
          currency: 'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
          effect: '+119000000',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
        {
          block: 58840931,
          transaction:
            '507600a4c503c3d2b25050927650eb3a48906cc18882bd7eb88b721b9c5c583e',
          sort_key: 55,
          time: '2024-02-05T18:26:03.000000Z',
          currency: 'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
          effect: '+370000000',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
        {
          block: 58747442,
          transaction:
            'c32d8678a8937f889626fba4ca01e52b7d11f80ac59b57a2fc0fad73c0d5b282',
          sort_key: 129,
          time: '2024-02-02T12:30:15.000000Z',
          currency: 'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
          effect: '+399000000',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
        {
          block: 58717705,
          transaction:
            'bfc3c00d310ad5a20f8c70d8b6ff4a64179155127a75de5c464994c2c74ae00d',
          sort_key: 151,
          time: '2024-02-01T11:42:54.000000Z',
          currency: 'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
          effect: '+22000000',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
        {
          block: 58655649,
          transaction:
            '08a36ffc7dbc060ae95600a26ba055e271147832aca9376c51c6fb5d861040cd',
          sort_key: 31,
          time: '2024-01-30T07:59:15.000000Z',
          currency: 'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
          effect: '+300000000',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
        {
          block: 58484245,
          transaction:
            '9fff1e9437a2ba9f2f67adbfea19ee969b227edf63835ca6e4baeafca5ee263c',
          sort_key: 177,
          time: '2024-01-24T09:06:36.000000Z',
          currency: 'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
          effect: '+214000000',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
        {
          block: 58403071,
          transaction:
            'd33ff49704a83e3239ed01ee41cda1d192452b3950bb38afaeac1d54783c44aa',
          sort_key: 165,
          time: '2024-01-21T13:26:27.000000Z',
          currency: 'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
          effect: '+300000000',
          failed: false,
          extra: null,
          extra_indexed: null,
        },
      ],
      'tron-trc-721': [],
      'tron-trc-1155': [],
    },
    mempool: [],
  },
  library: {
    currencies: {
      tron: {
        name: 'TRON',
        type: 'FT',
        symbol: 'TRX',
        decimals: 6,
        description: null,
      },
      'tron-trc-10/1005011': {
        name: 'unibot.fun',
        type: 'FT',
        symbol: 'unibot.fun',
        decimals: 6,
        description: null,
      },
      'tron-trc-10/1005027': {
        name: 'Pay.bi',
        type: 'FT',
        symbol: 'Pay.bi',
        decimals: 6,
        description: null,
      },
      'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
        name: 'Tether USD',
        type: 'FT',
        symbol: 'USDT',
        decimals: 6,
        description: null,
      },
    },
    rates: {
      '2024-03-26T08:11:06.000000Z': {
        tron: {
          usd: '0.12145',
        },
      },
      '2024-03-26T08:11:00.000000Z': {
        tron: {
          usd: '0.12145',
        },
      },
      '2024-03-26T08:10:18.000000Z': {
        tron: {
          usd: '0.12145',
        },
        'tron-trc-10/1005027': {
          usd: null,
        },
      },
      '2024-03-26T08:09:57.000000Z': {
        tron: {
          usd: '0.12145',
        },
      },
      '2024-03-26T08:09:51.000000Z': {
        tron: {
          usd: '0.12145',
        },
      },
      '2024-03-16T21:15:36.000000Z': {
        tron: {
          usd: '0.12528',
        },
      },
      '2024-03-16T21:15:21.000000Z': {
        tron: {
          usd: '0.12528',
        },
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '0.99936338509582',
        },
      },
      '2023-12-16T17:49:18.000000Z': {
        tron: {
          usd: '0.1026',
        },
      },
      now: {
        'tron-trc-10/1005011': {
          usd: null,
        },
        'tron-trc-10/1005027': {
          usd: null,
        },
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '1.0005727433342',
        },
        tron: {
          usd: '0.11838',
        },
      },
      '2023-11-05T07:15:48.000000Z': {
        'tron-trc-10/1005011': {
          usd: null,
        },
      },
      '2024-04-08T14:10:09.000000Z': {
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '0.99984015748753',
        },
      },
      '2024-03-25T08:28:15.000000Z': {
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '1.0004313163081',
        },
      },
      '2024-02-23T09:10:42.000000Z': {
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '0.99958348646684',
        },
      },
      '2024-02-05T18:26:03.000000Z': {
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '0.9989274473085',
        },
      },
      '2024-02-02T12:30:15.000000Z': {
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '0.99964253581126',
        },
      },
      '2024-02-01T11:42:54.000000Z': {
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '0.9990196842007',
        },
      },
      '2024-01-30T07:59:15.000000Z': {
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '0.99982518084987',
        },
      },
      '2024-01-24T09:06:36.000000Z': {
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '0.99913819693873',
        },
      },
      '2024-01-21T13:26:27.000000Z': {
        'tron-trc-20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t': {
          usd: '0.99938536647594',
        },
      },
    },
  },
  context: {
    code: 200,
    request_cost: 1,
    api: {
      version: '3.0.0-alpha',
      notice: ':)',
    },
    time: 0.220977,
  },
};

const getAddressData = async (networkCode, address) => {
  let result = {
    balance: 0,
    tokens: [],
    symbols: [],
  };
  const url = `https://api.3xpl.com/${networkCode}/address/${address}?data=address,balances,events,mempool&from=all&library=currencies,rates(usd)&token=${process.env.XPL_API_KEY}`;

  const response = await fetch(url);
  let results = await response.json();
  // let results = testData;
  if (!results.data.balances) {
    return result;
  }

  Object.entries(results.data.balances).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        let token = results.library.currencies[nestedKey];
        let price = results.library.rates.now[nestedKey];
        if (price.usd == null) {
          return;
        }

        let balance =
          (price.usd * parseFloat(nestedValue.balance)) /
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
          price: price.usd,
        });
      });
    }
  });

  return result;
  // console.log(JSON.stringify(results, null, 2));
};

(async () => {
  // console.time('Execution time:');
  // // console.log(await parseFoundationAddresses());
  // // // calculateDonationsStats(testData);
  // console.log(
  //   // await getAddressData('tron', 'TKAoHbqcc3qnDdvfobYFRZ9daBU6yAsEFW')
  //   await getAddressData(
  //     'ethereum',
  //     '0x551896dc6A14041c10B9896457088306CE7269aA'
  //   )
  // );
  // console.timeEnd('Execution time:');
})();

module.exports = {
  parseFoundationAddresses,
  calculateDonationsStats,
  checkWalletAddress,
};
