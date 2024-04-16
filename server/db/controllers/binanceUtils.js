// const Binance = require('binance-api-node').default;
const { Spot } = require('@binance/connector');
const coin = require('./coin');
const fs = require('fs');
require('dotenv').config();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

let pairs = require('./pairs.json');

const getUserInformation = async (apiKey, apiSecret, isTestnet) => {
  let options = {};
  if (isTestnet) {
    options.baseURL = 'https://testnet.binance.vision';
  }

  let result = {
    totalValue: 0,
    dailyValue: 0,
    dailyChange: 0,
    dailyChangePercentage: 0,
  };
  let coinsStr = '';
  let coins = [];
  const client = new Spot(apiKey, apiSecret, options);
  try {
    let { data } = await client.account();
    let assets = data.balances.filter(
      (el) =>
        parseFloat(el.free) + parseFloat(el.locked) > 0 &&
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
    let metadataReqLink = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${coinsStr}&aux=logo&skip_invalid=true&CMC_PRO_API_KEY=${process.env.CMC_API_KEY}`;
    try {
      const response = await fetch(metadataReqLink);
      metadataRes = await response.json();
    } catch (err) {
      console.log(err);
      return { error: err.message };
    }

    if (!metadataRes.data) {
      return { error: 'Could not get metadata' };
    }

    const mapped = priceChanges?.data.map((item) => ({ [item.symbol]: item }));
    const mappedChanges = Object.assign({}, ...mapped);

    for (let el of assets) {
      // console.log(el);
      let key = `${el.asset}USDT`;
      el.name = metadataRes.data[el.asset][0]?.name || el.asset;
      el.logo =
        metadataRes.data[el.asset][0]?.logo ||
        'https://static-00.iconduck.com/assets.00/no-image-icon-512x512-lfoanl0w.png';

      if (el.asset == 'USDT') {
        let tokens = parseFloat(el.free) + parseFloat(el.locked);
        el.totalValue = tokens;
        el.tokens = parseFloat(tokens.toFixed(8));
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

      let tokens = parseFloat(el.free) + parseFloat(el.locked);
      let totalValue = parseFloat(el.price) * tokens;
      let dailyPrice = mappedChanges[key].openPrice.replace(/\.?0+$/, '');
      let dailyValue = parseFloat(dailyPrice) * parseFloat(el.free);
      let dailyChange = totalValue - dailyValue;

      el.tokens = parseFloat(tokens.toFixed(8));
      el.totalValue = totalValue.toFixed(2);
      el.pair = `${el.asset}USDT`;
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
    if (err?.response?.data?.msg) {
      return { error: err?.response?.data?.msg };
    }
    console.log(err);
    return { error: 'Got an error while fetching account data:' };
  }
};

const updateMarketPairs = async (apiKey, apiSecret, isTestnet) => {
  let options = {};
  if (isTestnet) {
    options.baseURL = 'https://testnet.binance.vision';
  }
  pairs = [];
  const client = new Spot(apiKey, apiSecret, options);
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

const getUserOrders = async (apiKey, apiSecret, isTestnet, symbol) => {
  let options = {};
  if (isTestnet) {
    options.baseURL = 'https://testnet.binance.vision';
  }
  const client = new Spot(apiKey, apiSecret, options);

  try {
    let { data } = await client.allOrders(symbol);
    if (data.length < 1) {
      return [];
    }
    return data.reverse();
  } catch (err) {
    if (err?.response?.data?.msg) {
      return { err: err?.response?.data?.msg };
    }
    return { err };
  }
};

const createOrder = async (
  apiKey,
  apiSecret,
  isTestnet,
  symbol,
  type,
  side,
  orderOptions
) => {
  let options = {};
  if (isTestnet) {
    options.baseURL = 'https://testnet.binance.vision';
  }
  const client = new Spot(apiKey, apiSecret, options);

  try {
    let { data } = await client.newOrder(symbol, side, type, orderOptions);
    if (data?.orderId) {
      return data;
    }
  } catch (err) {
    if (err?.response?.data?.msg) {
      return { err: err?.response?.data?.msg };
    }
    return { err };
  }
};

const cancelOrder = async (apiKey, apiSecret, isTestnet, symbol, orderId) => {
  let options = {};
  if (isTestnet) {
    options.baseURL = 'https://testnet.binance.vision';
  }
  try {
    const client = new Spot(apiKey, apiSecret, options);
    let { data } = await client.cancelOrder(symbol, { orderId });
    console.log(data);
    if (data.status == 'CANCELED') {
      return true;
    }
  } catch (err) {
    if (err?.response?.data?.msg) {
      return { err: err?.response?.data?.msg };
    }
    return { err };
  }
};

const checkTradePermissions = async (apiKey, apiSecret) => {
  try {
    const client = new Spot(apiKey, apiSecret);
    const { data } = await client.apiPermissions();
    return data.enableSpotAndMarginTrading;
  } catch (err) {
    if (err?.response?.data?.msg) {
      return { err: err?.response?.data?.msg };
    }
    return { err };
    //{ err: 'Invalid API-key, IP, or permissions for action.' }
  }
};

// (async () => {
//   console.time('Execution');
//   const client = new Spot(
//     process.env.BINANCE_API_KEY,
//     process.env.BINANCE_API_SECRET
//   );
//   // console.log(
//   //   await getUserInformation(
//   //     process.env.BINANCE_API_KEY,
//   //     process.env.BINANCE_API_SECRET
//   //   )
//   // );
//   // await updateMarketPairs(process.env.BINANCE_API_KEY,
//   //      process.env.BINANCE_API_SECRET)
//   console.log(
//     await checkTradePermissions(
//       process.env.BINANCE_API_KEY,
//       process.env.BINANCE_API_SECRET
//     )
//   );

//   console.timeEnd('Execution');
// })();

module.exports = {
  getUserInformation,
  getUserOrders,
  createOrder,
  cancelOrder,
  checkTradePermissions
};
