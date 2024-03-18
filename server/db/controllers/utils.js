require('dotenv').config();

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const calculatePortfolioStats = async (portfolio) => {
  const uniqueCoins = {};
  const coingeckoCoins = [];
  portfolio.dailyChange = 0;
  portfolio.totalChange = 0;
  portfolio.totalInvested = 0;
  portfolio.totalValue = 0;
  portfolio.dailyChangePercentage = 0;
  portfolio.totalChangePercentage = 0;
  portfolio.Transactions.forEach((transaction) => {
    const coinId = transaction.coinId;
    if (!(coinId in uniqueCoins)) {
      uniqueCoins[coinId] = transaction.Coin;
      if (transaction.Coin.provider === 'coingecko') {
        coingeckoCoins.push(transaction.Coin.code);
      }
    }
  });

  if (coingeckoCoins.length < 0) {
    return portfolio;
  }
  const coingeckoCoinsStr = coingeckoCoins.join('%2C');
  //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&price_change_percentage=24h`
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${portfolio.Currency.code}&ids=${coingeckoCoinsStr}&price_change_percentage=24h`;
  const options = {
    method: 'GET',
    headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API },
  };

  let responseArr;
  try {
    const response = await fetch(url, options);
    responseArr = await response.json();
    // responseArr = coingeckoResponse;
    // console.log(responseArr)
  } catch (err) {
    return err;
  }
  if (!responseArr) return;

  const mapped = responseArr.map((item) => ({ [item.id]: item }));
  const responseObj = Object.assign({}, ...mapped);

  portfolio.Transactions.forEach((transaction) => {
    let transactionStartValue =
      transaction.amount * transaction.costPerUnitInCurrency;
    if (transaction.amount < 0) {
      transactionStartValue -= transaction.fees;
    } else {
      transactionStartValue += transaction.fees;
    }
    let transactionNowValue =
      transaction.amount *
      responseObj[transaction['Coin']['code']].current_price;
    let transaction24HValue =
      transaction.amount *
      (responseObj[transaction['Coin']['code']].current_price -
        responseObj[transaction['Coin']['code']].price_change_24h);

    portfolio.dailyChange += transactionNowValue - transaction24HValue;
    portfolio.totalChange += transactionNowValue - transactionStartValue;
    portfolio.totalInvested += transactionStartValue;
    portfolio.totalValue += transactionNowValue;
  });
  portfolio.dailyChangePercentage = (
    (portfolio.dailyChange * 100) /
    portfolio.totalValue
  ).toFixed(2);
  portfolio.totalChangePercentage = (
    (portfolio.totalChange * 100) /
    portfolio.totalInvested
  ).toFixed(2);
  return portfolio;
};

const calculatePortfolioCoins = async (portfolio) => {
  const uniqueCoins = {};
  const coingeckoCoins = [];
  portfolio.dailyChange = 0;
  portfolio.totalChange = 0;
  portfolio.totalInvested = 0;
  portfolio.totalValue = 0;
  portfolio.dailyChangePercentage = 0;
  portfolio.totalChangePercentage = 0;
  portfolio.coins = {};
  portfolio.Transactions.forEach((transaction) => {
    const coinId = transaction.coinId;
    if (!(coinId in uniqueCoins)) {
      uniqueCoins[coinId] = transaction.Coin;
      portfolio.coins[transaction.Coin.id] = {
        ...transaction.Coin,
        amount: 0,
        totalValue: 0,
        totalInvested: 0,
        price: 0,
        dailyChange: 0,
        dailyChangePercentage: 0,
        totalChange: 0,
        totalChangePercentage: 0,
        allocation: 0,
      };
      if (transaction.Coin.provider === 'coingecko') {
        coingeckoCoins.push(transaction.Coin.code);
      }
    }
  });

  // console.log(portfolio);
  // return;

  if (coingeckoCoins.length < 0) {
    return portfolio;
  }
  const coingeckoCoinsStr = coingeckoCoins.join('%2C');
  //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&price_change_percentage=24h`
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${portfolio.Currency.code}&ids=${coingeckoCoinsStr}&price_change_percentage=24h`;
  const options = {
    method: 'GET',
    headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API },
  };

  let responseArr;
  try {
    const response = await fetch(url, options);
    responseArr = await response.json();
    // responseArr = coingeckoResponse;
    // console.log(responseArr)
  } catch (err) {
    return err;
  }
  if (!responseArr) return;

  const mapped = responseArr.map((item) => ({ [item.id]: item }));
  const responseObj = Object.assign({}, ...mapped);

  portfolio.Transactions.forEach((transaction) => {
    let transactionStartValue =
      transaction.amount * transaction.costPerUnitInCurrency;
    if (transaction.amount < 0) {
      transactionStartValue -= transaction.fees;
    } else {
      transactionStartValue += transaction.fees;
    }
    let transactionNowValue =
      transaction.amount *
      responseObj[transaction['Coin']['code']].current_price;
    let transaction24HValue =
      transaction.amount *
      (responseObj[transaction['Coin']['code']].current_price -
        responseObj[transaction['Coin']['code']].price_change_24h);

    let dailyChange = transactionNowValue - transaction24HValue;
    let totalChange = transactionNowValue - transactionStartValue;
    portfolio.dailyChange += dailyChange;
    portfolio.totalChange += totalChange;
    portfolio.totalInvested += transactionStartValue;
    portfolio.totalValue += transactionNowValue;

    portfolio.coins[transaction.Coin.id].price =
      responseObj[transaction['Coin']['code']].current_price;
    portfolio.coins[transaction.Coin.id].amount += transaction.amount;
    portfolio.coins[transaction.Coin.id].dailyChange += dailyChange;
    portfolio.coins[transaction.Coin.id].totalChange += totalChange;
    portfolio.coins[transaction.Coin.id].totalInvested += transactionStartValue;
    portfolio.coins[transaction.Coin.id].totalValue += transactionNowValue;
  });
  portfolio.dailyChangePercentage = (
    (portfolio.dailyChange * 100) /
    portfolio.totalValue
  ).toFixed(2);
  portfolio.totalChangePercentage = (
    (portfolio.totalChange * 100) /
    portfolio.totalInvested
  ).toFixed(2);
  portfolio.coins = Object.values(portfolio.coins);
  for (let coin of portfolio.coins) {
    coin.dailyChangePercentage = (
      (coin.dailyChange * 100) /
      coin.totalValue
    ).toFixed(2);
    coin.totalChangePercentage = (
      (coin.totalChange * 100) /
      coin.totalInvested
    ).toFixed(2);
    coin.allocation = ((coin.totalValue * 100) / portfolio.totalValue).toFixed(
      2
    );
  }
  return portfolio;
};

const testData = [
  {
    id: 1,
    uuid: '48995826-0d2e-40ed-97e2-4c14e710b84d',
    userId: 'google-oauth2|116450147994105467130',
    title: 'test',
    currencyId: 1,
    visibility: false,
    createdAt: '2024-03-10T18:20:27.528Z',
    updatedAt: '2024-03-10T18:20:54.638Z',
    Transactions: [
      {
        id: 11,
        portfolioId: 1,
        coinId: 64,
        date: '2024-03-18T13:24:40.000Z',
        amount: 1,
        fees: 0,
        description: '',
        originCurrency: 'USD',
        costPerUnitInUsd: 1.63,
        costPerUnitInCurrency: 1.63,
        createdAt: '2024-03-18T13:25:50.389Z',
        updatedAt: '2024-03-18T13:25:50.389Z',
        Coin: {
          id: 64,
          name: 'Sui',
          code: 'sui',
          symbol: 'sui',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg?1696525453',
          createdAt: '2024-03-16T18:26:02.505Z',
          updatedAt: '2024-03-16T18:26:02.505Z',
        },
      },
      {
        id: 8,
        portfolioId: 1,
        coinId: 64,
        date: '2024-03-18T08:25:31.000Z',
        amount: 122,
        fees: 2,
        description: 'sf',
        originCurrency: 'USD',
        costPerUnitInUsd: 1.71,
        costPerUnitInCurrency: 1.71,
        createdAt: '2024-03-18T08:25:47.464Z',
        updatedAt: '2024-03-18T08:25:47.464Z',
        Coin: {
          id: 64,
          name: 'Sui',
          code: 'sui',
          symbol: 'sui',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg?1696525453',
          createdAt: '2024-03-16T18:26:02.505Z',
          updatedAt: '2024-03-16T18:26:02.505Z',
        },
      },
      {
        id: 7,
        portfolioId: 1,
        coinId: 228,
        date: '2024-03-18T08:03:46.000Z',
        amount: -10,
        fees: 2,
        description: '',
        originCurrency: 'USD',
        costPerUnitInUsd: 1.72,
        costPerUnitInCurrency: 1.72,
        createdAt: '2024-03-18T08:17:28.833Z',
        updatedAt: '2024-03-18T08:17:28.833Z',
        Coin: {
          id: 228,
          name: 'Sushi',
          code: 'sushi',
          symbol: 'sushi',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png?1696512101',
          createdAt: '2024-03-16T18:26:02.505Z',
          updatedAt: '2024-03-16T18:26:02.505Z',
        },
      },
      {
        id: 6,
        portfolioId: 1,
        coinId: 228,
        date: '2024-03-18T08:03:03.000Z',
        amount: 1.33,
        fees: 0,
        description: '',
        originCurrency: 'USD',
        costPerUnitInUsd: 1.72,
        costPerUnitInCurrency: 1.72,
        createdAt: '2024-03-18T08:03:46.105Z',
        updatedAt: '2024-03-18T08:03:46.105Z',
        Coin: {
          id: 228,
          name: 'Sushi',
          code: 'sushi',
          symbol: 'sushi',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png?1696512101',
          createdAt: '2024-03-16T18:26:02.505Z',
          updatedAt: '2024-03-16T18:26:02.505Z',
        },
      },
      {
        id: 5,
        portfolioId: 1,
        coinId: 228,
        date: '2024-03-18T08:02:35.000Z',
        amount: 11,
        fees: 0.4,
        description: '',
        originCurrency: 'USD',
        costPerUnitInUsd: 1.72,
        costPerUnitInCurrency: 1.72,
        createdAt: '2024-03-18T08:03:03.342Z',
        updatedAt: '2024-03-18T08:03:03.342Z',
        Coin: {
          id: 228,
          name: 'Sushi',
          code: 'sushi',
          symbol: 'sushi',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png?1696512101',
          createdAt: '2024-03-16T18:26:02.505Z',
          updatedAt: '2024-03-16T18:26:02.505Z',
        },
      },
      {
        id: 3,
        portfolioId: 1,
        coinId: 1,
        date: '2024-02-25T00:00:00.000Z',
        amount: 0.05,
        fees: 3.4,
        description: 'Add more BTC',
        originCurrency: 'USD',
        costPerUnitInUsd: 69985,
        costPerUnitInCurrency: 69985,
        createdAt: '2024-03-16T12:52:47.994Z',
        updatedAt: '2024-03-16T12:52:47.994Z',
        Coin: {
          id: 1,
          name: 'Bitcoin',
          code: 'bitcoin',
          symbol: 'btc',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
          createdAt: null,
          updatedAt: null,
        },
      },
      {
        id: 2,
        portfolioId: 1,
        coinId: 2,
        date: '2024-02-23T00:00:00.000Z',
        amount: 0.1,
        fees: 3.44,
        description: 'Bought some Ether',
        originCurrency: 'USD',
        costPerUnitInUsd: 3904.55,
        costPerUnitInCurrency: 3904.55,
        createdAt: '2024-03-12T12:25:32.416Z',
        updatedAt: '2024-03-12T12:25:32.416Z',
        Coin: {
          id: 2,
          name: 'Ethereum',
          code: 'ethereum',
          symbol: 'eth',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
          createdAt: null,
          updatedAt: null,
        },
      },
      {
        id: 1,
        portfolioId: 1,
        coinId: 1,
        date: '2024-02-20T00:00:00.000Z',
        amount: 0.023,
        fees: 5.44,
        description: 'First Bitcoin BUY',
        originCurrency: 'USD',
        costPerUnitInUsd: 72221.35,
        costPerUnitInCurrency: 72221.35,
        createdAt: '2024-03-12T12:24:45.635Z',
        updatedAt: '2024-03-12T12:24:45.635Z',
        Coin: {
          id: 1,
          name: 'Bitcoin',
          code: 'bitcoin',
          symbol: 'btc',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
          createdAt: null,
          updatedAt: null,
        },
      },
    ],
    Currency: {
      id: 1,
      name: 'USD',
      code: 'usd',
      symbol: '$',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
    dailyChange: -84.22892191005317,
    totalChange: -339.1047500000001,
    totalInvested: 5777.73365,
    totalValue: 5438.6289,
    dailyChangePercentage: '-1.55',
    totalChangePercentage: '-5.87',
  },
  {
    id: 2,
    uuid: 'd3cd386c-11a0-4b33-8013-77298234388c',
    userId: 'google-oauth2|116450147994105467130',
    title: 'name',
    currencyId: 2,
    visibility: false,
    createdAt: '2024-03-15T12:53:16.918Z',
    updatedAt: '2024-03-15T19:18:52.971Z',
    Transactions: [
      {
        id: 16,
        portfolioId: 2,
        coinId: 5,
        date: '2024-03-18T13:53:05.000Z',
        amount: -1,
        fees: 3,
        description: '',
        originCurrency: 'EUR',
        costPerUnitInUsd: 203.8044077437051,
        costPerUnitInCurrency: 187.17,
        createdAt: '2024-03-18T13:53:19.150Z',
        updatedAt: '2024-03-18T13:53:19.150Z',
        Coin: {
          id: 5,
          name: 'Solana',
          code: 'solana',
          symbol: 'sol',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756',
          createdAt: '2024-03-16T18:21:40.271Z',
          updatedAt: '2024-03-16T18:21:40.271Z',
        },
      },
      {
        id: 14,
        portfolioId: 2,
        coinId: 5,
        date: '2024-03-06T13:52:23.000Z',
        amount: 2,
        fees: 12,
        description: '',
        originCurrency: 'EUR',
        costPerUnitInUsd: 203.8044077437051,
        costPerUnitInCurrency: 187.17,
        createdAt: '2024-03-18T13:52:46.040Z',
        updatedAt: '2024-03-18T13:52:46.040Z',
        Coin: {
          id: 5,
          name: 'Solana',
          code: 'solana',
          symbol: 'sol',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756',
          createdAt: '2024-03-16T18:21:40.271Z',
          updatedAt: '2024-03-16T18:21:40.271Z',
        },
      },
      {
        id: 15,
        portfolioId: 2,
        coinId: 64,
        date: '2024-03-05T13:52:46.000Z',
        amount: 20,
        fees: 0,
        description: '',
        originCurrency: 'EUR',
        costPerUnitInUsd: 1.6333098873513794,
        costPerUnitInCurrency: 1.5,
        createdAt: '2024-03-18T13:53:04.998Z',
        updatedAt: '2024-03-18T13:53:04.998Z',
        Coin: {
          id: 64,
          name: 'Sui',
          code: 'sui',
          symbol: 'sui',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg?1696525453',
          createdAt: '2024-03-16T18:26:02.505Z',
          updatedAt: '2024-03-16T18:26:02.505Z',
        },
      },
      {
        id: 10,
        portfolioId: 2,
        coinId: 1,
        date: '2023-12-22T09:37:31.000Z',
        amount: 0.1,
        fees: 2,
        description: '',
        originCurrency: 'EUR',
        costPerUnitInUsd: 49042.65918123798,
        costPerUnitInCurrency: 45010,
        createdAt: '2024-03-18T09:38:05.865Z',
        updatedAt: '2024-03-18T09:38:05.865Z',
        Coin: {
          id: 1,
          name: 'Bitcoin',
          code: 'bitcoin',
          symbol: 'btc',
          provider: 'coingecko',
          image:
            'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
          createdAt: null,
          updatedAt: null,
        },
      },
    ],
    Currency: {
      id: 2,
      name: 'EUR',
      code: 'eur',
      symbol: '€',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
    dailyChange: -77.26992193519547,
    totalChange: 1641.7900000000006,
    totalInvested: 4729.17,
    totalValue: 6370.960000000001,
    dailyChangePercentage: '-1.21',
    totalChangePercentage: '34.72',
  },
  {
    id: 7,
    uuid: '63ff8747-8dca-4c87-9221-22ec310eddfe',
    userId: 'google-oauth2|116450147994105467130',
    title: 'temp1',
    currencyId: 1,
    visibility: false,
    createdAt: '2024-03-18T13:35:30.039Z',
    updatedAt: '2024-03-18T13:35:30.039Z',
    Transactions: [],
    Currency: {
      id: 1,
      name: 'USD',
      code: 'usd',
      symbol: '$',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
    dailyChange: 0,
    totalChange: 0,
    totalInvested: 0,
    totalValue: 0,
    dailyChangePercentage: 'NaN',
    totalChangePercentage: 'NaN',
  },
];

const calculateAllPortfolios = async (portfoliosArr) => {
  let res = {
    dailyChange: 0,
    totalChange: 0,
    totalInvested: 0,
    totalValue: 0,
    dailyChangePercentage: '',
    totalChangePercentage: '',
  };
  let currencyRates = {};
  let currencies = [];
  for (let el of portfoliosArr) {
    if (!currencies.includes[el['Currency'].code]) {
      currencies.push(el['Currency'].code);
    }
  }
  if (currencies.length == 1 && currencies[0] == 'usd') {
    currencyRates['usd'] = 1;
  }
  let requestUrl = `https://api.currencybeacon.com/v1/latest?base=usd&symbols=${currencies.join(
    ','
  )}&api_key=${process.env.BEACON_API}`;
  const response = await fetch(requestUrl);
  let responseJSON = await response.json();
  if (!responseJSON?.rates) {
    return;
  }
  for (let el of portfoliosArr) {
    let rate = 1;
    if (el['Currency'].code != 'usd') {
      rate = responseJSON.rates[el['Currency'].code.toUpperCase()];
    }
    res.dailyChange += el.dailyChange / rate;
    res.totalChange += el.totalChange / rate;
    res.totalInvested += el.totalInvested / rate;
    res.totalValue += el.totalValue / rate;
  }

  res.dailyChangePercentage = (
    (res.dailyChange * 100) /
    res.totalValue
  ).toFixed(2);
  res.totalChangePercentage = (
    (res.totalChange * 100) /
    res.totalInvested
  ).toFixed(2);
  
  return res;
};
(async () => {
  // sampleData[0] = await calculatePortfolioStats(sampleData[0]);
  // console.log(sampleData)
  // console.time('Execution time');
  // console.log(await calculatePortfolioCoins(sampleData));
  // console.log(await calculateAllPortfolios(testData));
  // console.timeEnd('Execution time');
})();

module.exports = {
  calculatePortfolioStats,
  calculatePortfolioCoins,
  calculateAllPortfolios
};
