const { Spot } = require('@binance/connector');
const coin = require('./coin');
const fs = require('fs');
const path = require('node:path');
require('dotenv').config();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

let pairs = require('./pairs.json');
let dataPath = path.resolve(__dirname, 'coins-metadata.json');

const fetchMetadata = async (symbols, metaData) => {
  let metadataReqLink = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbols}&aux=logo&skip_invalid=true&CMC_PRO_API_KEY=${process.env.CMC_API_KEY}`;
  try {
    const response = await fetch(metadataReqLink);
    metadataJson = await response.json();
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
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }

  if (!metadataRes.data) {
    return { error: 'Could not get metadata' };
  }
  return metadataRes;
};

const getUserInformation = async (apiKey, apiSecret, isTestnet) => {
  let options = {};
  let useCashedMetadata = true;
  let metaDataText = fs.readFileSync(dataPath, 'utf8');
  let metaData = JSON.parse(metaDataText);
  if (
    !metaData.updatedAt ||
    !metaData.data ||
    Date.now() - metaData.updatedAt > 7 * 24 * 60 * 60 * 1000 // 7 days
  ) {
    useCashedMetadata = false;
  }

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
      if (!metaData.data || !metaData.data[el.asset]) {
        useCashedMetadata = false;
      }
    });
    let priceChanges = await client.ticker24hr('', coins);

    let metadataRes;
    if (useCashedMetadata) {
      metadataRes = metaData;
    } else {
      metadataRes = await fetchMetadata(coinsStr, metaData);
    }

    const mapped = priceChanges?.data.map((item) => ({ [item.symbol]: item }));
    const mappedChanges = Object.assign({}, ...mapped);

    for (let el of assets) {
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
      let dailyValue = parseFloat(dailyPrice) * (parseFloat(el.free) + parseFloat(el.locked));
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
  pairsData?.data?.symbols.forEach((el) => {
    if (el.status == 'TRADING') {
      pairs.push(el.symbol);
    }
  });
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
  }
};

// (async () => {
  //   console.time('Execution');
  // await updateMarketPairs(process.env.BINANCE_API_KEY,
  //      process.env.BINANCE_API_SECRET)
  //   console.timeEnd('Execution');
// })();

module.exports = {
  getUserInformation,
  getUserOrders,
  createOrder,
  cancelOrder,
  checkTradePermissions,
};
