import * as fs from 'fs';
import path from 'node:path';
// import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

export async function getCurrencyRate(symbol, base) {
  if (symbol == base) return 1;
  const requestUrl = `https://api.currencybeacon.com/v1/latest?base=${base}&symbols=${symbol}&api_key=${process.env.BEACON_API}`;
  const response = await fetch(requestUrl);
  const responseJSON = await response.json();
  if (!responseJSON?.rates) {
    return;
  }
  return responseJSON.rates[symbol.toUpperCase()];
}

export async function getAddressData(data) {
  if (!data.address || !data['SupportedNetwork']?.code) {
    return;
  }
  const result = {
    ...data,
    balance: 0,
    tokens: [],
    symbols: [],
  };
  const url = `https://api.3xpl.com/${data['SupportedNetwork']?.code}/address/${data.address}?data=address,balances,events,mempool&from=all&library=currencies,rates(usd)&token=${process.env.XPL_API_KEY}`;

  const response = await fetch(url);
  const results = await response.json();
  if (!results.data.balances) {
    return result;
  }

  const rate = await getCurrencyRate(data['Currency'].code, 'usd');

  Object.entries(results.data.balances).forEach(([, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        const token = results.library.currencies[nestedKey];
        const price = results.library.rates.now[nestedKey];
        if (price.usd == null) {
          return;
        }

        const balance =
          (price.usd * rate * parseFloat(nestedValue.balance)) /
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
          price: price.usd * rate,
        });
      });
    }
  });

  return result;
}

export async function getTokensMetadata(addresses) {
  let metadataJson;
  let useCashedMetadata = true;
  const dataPath = path.resolve('./src/common/utils', 'coins-metadata.json');
  const metaDataText = fs.readFileSync(dataPath, 'utf8');
  const metaData = JSON.parse(metaDataText);
  if (
    !metaData.updatedAt ||
    !metaData.data ||
    Date.now() - metaData.updatedAt > 7 * 24 * 60 * 60 * 1000 // 7 days
  ) {
    useCashedMetadata = false;
  }

  const symbolsArr = [];
  if (!addresses) {
    return {};
  }
  for (const el of addresses) {
    symbolsArr.push(...el.symbols);
    for (const symbol of el.symbols) {
      if (!metaData.data || !metaData.data[symbol]) {
        useCashedMetadata = false;
      }
    }
  }
  if (symbolsArr.length < 1) {
    return {};
  }

  let metadataRes;

  if (useCashedMetadata) {
    return metaData.data;
  }
  const symbols = [...new Set(symbolsArr)].join(',');
  const metadataReqLink = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbols}&aux=logo&CMC_PRO_API_KEY=${process.env.CMC_API_KEY}`;
  try {
    const response = await fetch(metadataReqLink);
    metadataJson = await response.json();
  } catch (err) {
    console.log(err);
    return [err];
  }
  if (!metadataJson.data) {
    return { error: 'Could not get metadata' };
  }
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
  return metadataJson.data;
}

export async function checkWalletAddress(networkCode, address) {
  const url = `https://api.3xpl.com/search?q=${address}&from=all&in=address&token=${process.env.XPL_API_KEY}`;

  const response = await fetch(url);
  const results = await response.json();

  if (!results.data?.results) return false;
  return results.data.results[networkCode]?.address ? true : false;
}
