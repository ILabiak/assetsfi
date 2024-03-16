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

    let dailyChange = transactionNowValue - transaction24HValue;
    let totalChange = transactionNowValue - transactionStartValue;
    portfolio.dailyChange += dailyChange;
    portfolio.totalChange += totalChange;
    portfolio.totalInvested += transactionStartValue;
    portfolio.totalValue += transactionNowValue;


    portfolio.coins[transaction.Coin.id].price = responseObj[transaction['Coin']['code']].current_price;
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

// (async () => {
//   // sampleData[0] = await calculatePortfolioStats(sampleData[0]);
//   // console.log(sampleData)
//   console.time('Execution time');
//   console.log(await calculatePortfolioCoins(sampleData));
//   console.timeEnd('Execution time');
// })();

module.exports = {
  calculatePortfolioStats,
  calculatePortfolioCoins
};
