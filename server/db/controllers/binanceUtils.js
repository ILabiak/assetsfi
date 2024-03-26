// const Binance = require('binance-api-node').default;
const { Spot } = require('@binance/connector');
const coin = require('./coin');
const fs = require('fs');
require('dotenv').config();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

let pairs = require('./pairs.json');

const getUserInformation = async (apiKey, apiSecret) => {
  let result = {
    totalValue: 0,
    dailyValue: 0,
    dailyChange: 0,
    dailyChangePercentage: 0,
  };
  let coinsStr = '';
  let coins = [];
  const client = new Spot(apiKey, apiSecret);
  try {
    let assets = await client.userAsset();
    assets = assets?.data.filter(
      (el) =>
        parseFloat(el.free) > 0 &&
        (pairs.includes(`${el.asset}USDT`) || el.asset == 'USDT')
    );
    assets.map((el) => {
      if (el.asset != 'USDT') {
        coins.push(`${el.asset}USDT`);
      }
      coinsStr += el.asset + ',';
    });

    let priceChanges = await client.ticker24hr('', coins);

    let metadataRes;
    let metadataReqLink = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${coinsStr}&aux=logo&CMC_PRO_API_KEY=${process.env.CMC_API_KEY}`;
    try {
      const response = await fetch(metadataReqLink);
      metadataRes = await response.json();
    } catch (err) {
      console.log(err);
      return err;
    }
    if (!metadataRes.data) {
      return { error: 'Could not get metadata' };
    }

    const mapped = priceChanges?.data.map((item) => ({ [item.symbol]: item }));
    const mappedChanges = Object.assign({}, ...mapped);

    for (let el of assets) {
      let key = `${el.asset}USDT`;
      el.name = metadataRes.data[el.asset][0].name;
      el.logo = metadataRes.data[el.asset][0].logo;

      if (el.asset == 'USDT') {
        el.totalValue = parseFloat(el.free);
        el.dailyChange = 0;
        el.dailyChangePercentage = 0;
        el.price = 1;
        result.totalValue += parseFloat(el.free);
        continue;
      }

      if (!mappedChanges[key]) {
        continue;
      }
      el.price = mappedChanges[key].lastPrice.replace(/\.?0+$/, '');

      let totalValue = parseFloat(el.price) * parseFloat(el.free);
      let dailyPrice = mappedChanges[key].openPrice.replace(/\.?0+$/, '');
      let dailyValue = parseFloat(dailyPrice) * parseFloat(el.free);
      let dailyChange = totalValue - dailyValue;

      el.totalValue = totalValue.toFixed(2);
      el.dailyChange = dailyChange.toFixed(2);
      el.dailyChangePercentage = parseFloat(
        mappedChanges[key]?.priceChangePercent
      ).toFixed(2);

      result.totalValue += totalValue;
      result.dailyChange += dailyChange;
    }

    result.dailyChangePercentage = (
      (result.dailyChange * 100) /
      result.totalValue
    ).toFixed(2);

    assets.sort((a, b) => parseFloat(b.totalValue) - parseFloat(a.totalValue));

    result.assets = assets;
    // console.log(result)

    return result;
  } catch (err) {
    console.log(err);
    return { error: 'Got an error while fetching account data:', err };
  }
};

const updateMarketPairs = async (apiKey, apiSecret) => {
  pairs = [];
  const client = new Spot(apiKey, apiSecret);
  let pairsData = await client.exchangeInfo();
  // console.log(pairsData)
  pairsData?.data?.symbols.forEach((el) => {
    if (el.status == 'TRADING') {
      pairs.push(el.symbol);
    }
  });
  console.log(pairs);
  fs.writeFileSync('pairs.json', JSON.stringify(pairs));
};

// (async () => {
//   console.time('Execution');
//   // const client = new Spot(
//   //   process.env.BINANCE_API_KEY,
//   //   process.env.BINANCE_API_SECRET
//   // );
//   await getUserInformation(
//     process.env.BINANCE_API_KEY,
//     process.env.BINANCE_API_SECRET
//   );

//   console.timeEnd('Execution');

//   //   let assetTransactions = await client.myTrades('ALTUSDT');
// })();

module.exports = {
  getUserInformation,
};
