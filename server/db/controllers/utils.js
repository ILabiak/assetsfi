const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

let sampleData = [
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
    ],
    Currency: {
      id: 1,
      name: 'USD',
      code: 'usd',
      symbol: '$',
      createdAt: '2024-03-10T18:21:45.952Z',
      updatedAt: '2024-03-10T18:21:45.952Z',
    },
  },
];

const coingeckoResponse = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    current_price: 71456,
    market_cap: 1409593073391,
    market_cap_rank: 1,
    fully_diluted_valuation: 1506256664475,
    total_volume: 56453230810,
    high_24h: 72734,
    low_24h: 71453,
    price_change_24h: -909.0676518349064,
    price_change_percentage_24h: -1.25622,
    market_cap_change_24h: -9618050813.083984,
    market_cap_change_percentage_24h: -0.6777,
    circulating_supply: 19652331,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 72734,
    ath_change_percentage: -1.3604,
    ath_date: '2024-03-12T14:10:26.731Z',
    atl: 67.81,
    atl_change_percentage: 105703.37331,
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: '2024-03-12T15:08:09.853Z',
    price_change_percentage_24h_in_currency: -1.2562246933103158,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    current_price: 3971.56,
    market_cap: 478358053539,
    market_cap_rank: 2,
    fully_diluted_valuation: 478358053539,
    total_volume: 25881735728,
    high_24h: 4085.78,
    low_24h: 3971.58,
    price_change_24h: -75.86246151626801,
    price_change_percentage_24h: -1.87434,
    market_cap_change_24h: -7336944764.529846,
    market_cap_change_percentage_24h: -1.51061,
    circulating_supply: 120093478.754273,
    total_supply: 120093478.754273,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -18.29407,
    ath_date: '2021-11-10T14:24:19.604Z',
    atl: 0.432979,
    atl_change_percentage: 920459.557,
    atl_date: '2015-10-20T00:00:00.000Z',
    roi: {
      times: 73.31696349853058,
      currency: 'btc',
      percentage: 7331.696349853058,
    },
    last_updated: '2024-03-12T15:08:07.803Z',
    price_change_percentage_24h_in_currency: -1.8743385380676696,
  },
];

const calculatePortfolioStats = async (portfolio) => {
  const uniqueCoins = {};
  const coingeckoCoins = [];
  portfolio.dailyGain = 0;
  portfolio.totalGain = 0;
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

  const uniqueCoinsArray = Object.values(uniqueCoins);
  // console.log(uniqueCoinsArray)
  // console.log(coingeckoCoins);

  if (coingeckoCoins.length < 0) {
    return;
  }
  const coingeckoCoinsStr = coingeckoCoins.join('%2C');
  //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&price_change_percentage=24h`
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${portfolio.Currency.code}&ids=${coingeckoCoinsStr}&price_change_percentage=24h`;
  const options = {
    method: 'GET',
    headers: { 'x-cg-demo-api-key': 'CG-bthjfURcC7USJnm7QVV3fwSo' },
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
      transaction.amount * transaction.costPerUnitInCurrency + transaction.fees;
    let transactionNowValue =
      transaction.amount *
      responseObj[transaction['Coin']['code']].current_price;
    let transaction24HValue =
      transaction.amount *
      (responseObj[transaction['Coin']['code']].current_price -
        responseObj[transaction['Coin']['code']].price_change_24h);

    portfolio.dailyGain += transactionNowValue - transaction24HValue;
    portfolio.totalGain += transactionNowValue - transactionStartValue;
    portfolio.totalInvested += transactionStartValue;
    portfolio.totalValue += transactionNowValue;
  });
  portfolio.dailyChangePercentage =
    ((portfolio.dailyGain * 100) / portfolio.totalValue).toFixed(2);
  portfolio.totalChangePercentage =
    ((portfolio.totalGain * 100) / portfolio.totalInvested).toFixed(2);
  return portfolio;
};

// (async () => {
//   sampleData[0] = await calculatePortfolioStats(sampleData[0]);
//   console.log(sampleData)
// })();

module.exports = {
  calculatePortfolioStats,
};
