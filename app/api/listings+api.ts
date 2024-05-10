
import { ExpoRequest, ExpoResponse } from 'expo-router/server';

const API_KEY = process.env.CRYPTO_API_KEY;

export async function GET(request: ExpoRequest) {
  // const limit = request.expoUrl.searchParams.get('limit') || 5;
  // const response = await fetch(
  //   `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=USD`,
  //   {
  //     headers: {
  //       'X-CMC_PRO_API_KEY': API_KEY!,
  //     }
  //   }
  // );
  // const result = await response.json();
  // return ExpoResponse.json(result.data)
  // 1,1027,825,1839,5426

  return ExpoResponse.json(data);
}

const data = [
  {
    "id": 1,
    "name": "Bitcoin",
    "symbol": "BTC",
    "slug": "bitcoin",
    "num_market_pairs": 11024,
    "date_added": "2010-07-13T00:00:00.000Z",
    "tags": [
      "mineable",
      "pow",
      "sha-256",
      "store-of-value",
      "state-channel",
      "coinbase-ventures-portfolio",
      "three-arrows-capital-portfolio",
      "polychain-capital-portfolio",
      "binance-labs-portfolio",
      "blockchain-capital-portfolio",
      "boostvc-portfolio",
      "cms-holdings-portfolio",
      "dcg-portfolio",
      "dragonfly-capital-portfolio",
      "electric-capital-portfolio",
      "fabric-ventures-portfolio",
      "framework-ventures-portfolio",
      "galaxy-digital-portfolio",
      "huobi-capital-portfolio",
      "alameda-research-portfolio",
      "a16z-portfolio",
      "1confirmation-portfolio",
      "winklevoss-capital-portfolio",
      "usv-portfolio",
      "placeholder-ventures-portfolio",
      "pantera-capital-portfolio",
      "multicoin-capital-portfolio",
      "paradigm-portfolio",
      "bitcoin-ecosystem",
      "ftx-bankruptcy-estate"
    ],
    "max_supply": 21000000,
    "circulating_supply": 19694996,
    "total_supply": 19694996,
    "infinite_supply": false,
    "platform": null,
    "cmc_rank": 1,
    "self_reported_circulating_supply": null,
    "self_reported_market_cap": null,
    "tvl_ratio": null,
    "last_updated": "2024-05-07T06:00:00.000Z",
    "quote": {
      "USD": {
        "price": 63546.343942837026,
        "volume_24h": 30550158070.278473,
        "volume_change_24h": 70.9341,
        "percent_change_1h": 0.15880652,
        "percent_change_24h": -1.00682108,
        "percent_change_7d": 0.36502147,
        "percent_change_30d": -8.40780962,
        "percent_change_60d": -5.13796162,
        "percent_change_90d": 47.78678749,
        "market_cap": 1251544989768.7996,
        "market_cap_dominance": 53.4837,
        "fully_diluted_market_cap": 1334473222799.58,
        "tvl": null,
        "last_updated": "2024-05-07T06:00:00.000Z"
      }
    }
  },
  {
    "id": 1027,
    "name": "Ethereum",
    "symbol": "ETH",
    "slug": "ethereum",
    "num_market_pairs": 8898,
    "date_added": "2015-08-07T00:00:00.000Z",
    "tags": [
      "pos",
      "smart-contracts",
      "ethereum-ecosystem",
      "coinbase-ventures-portfolio",
      "three-arrows-capital-portfolio",
      "polychain-capital-portfolio",
      "binance-labs-portfolio",
      "blockchain-capital-portfolio",
      "boostvc-portfolio",
      "cms-holdings-portfolio",
      "dcg-portfolio",
      "dragonfly-capital-portfolio",
      "electric-capital-portfolio",
      "fabric-ventures-portfolio",
      "framework-ventures-portfolio",
      "hashkey-capital-portfolio",
      "kenetic-capital-portfolio",
      "huobi-capital-portfolio",
      "alameda-research-portfolio",
      "a16z-portfolio",
      "1confirmation-portfolio",
      "winklevoss-capital-portfolio",
      "usv-portfolio",
      "placeholder-ventures-portfolio",
      "pantera-capital-portfolio",
      "multicoin-capital-portfolio",
      "paradigm-portfolio",
      "injective-ecosystem",
      "layer-1",
      "ftx-bankruptcy-estate"
    ],
    "max_supply": null,
    "circulating_supply": 120101536.93169221,
    "total_supply": 120101536.93169221,
    "infinite_supply": true,
    "platform": null,
    "cmc_rank": 2,
    "self_reported_circulating_supply": null,
    "self_reported_market_cap": null,
    "tvl_ratio": null,
    "last_updated": "2024-05-07T05:59:00.000Z",
    "quote": {
      "USD": {
        "price": 3068.5288282815445,
        "volume_24h": 13742663429.913774,
        "volume_change_24h": 61.0502,
        "percent_change_1h": 0.11248058,
        "percent_change_24h": -3.35615704,
        "percent_change_7d": -3.19560915,
        "percent_change_30d": -9.67149777,
        "percent_change_60d": -21.17666709,
        "percent_change_90d": 29.79659958,
        "market_cap": 368535028395.8182,
        "market_cap_dominance": 15.747,
        "fully_diluted_market_cap": 368535028395.82,
        "tvl": null,
        "last_updated": "2024-05-07T05:59:00.000Z"
      }
    }
  },
  {
    "id": 825,
    "name": "Tether USDt",
    "symbol": "USDT",
    "slug": "tether",
    "num_market_pairs": 84758,
    "date_added": "2015-02-25T00:00:00.000Z",
    "tags": [
      "stablecoin",
      "asset-backed-stablecoin",
      "avalanche-ecosystem",
      "solana-ecosystem",
      "arbitrum-ecosytem",
      "moonriver-ecosystem",
      "injective-ecosystem",
      "bnb-chain",
      "usd-stablecoin",
      "optimism-ecosystem"
    ],
    "max_supply": null,
    "circulating_supply": 110971000757.37616,
    "total_supply": 113086550461.39429,
    "platform": {
      "id": 1027,
      "name": "Ethereum",
      "symbol": "ETH",
      "slug": "ethereum",
      "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7"
    },
    "infinite_supply": true,
    "cmc_rank": 3,
    "self_reported_circulating_supply": null,
    "self_reported_market_cap": null,
    "tvl_ratio": null,
    "last_updated": "2024-05-07T05:59:00.000Z",
    "quote": {
      "USD": {
        "price": 1.0000092259453237,
        "volume_24h": 55027947823.96208,
        "volume_change_24h": 53.4836,
        "percent_change_1h": 0.0038412,
        "percent_change_24h": 0.0016725,
        "percent_change_7d": 0.01875899,
        "percent_change_30d": -0.00036859,
        "percent_change_60d": -0.10574658,
        "percent_change_90d": 0.07159615,
        "market_cap": 110972024569.76166,
        "market_cap_dominance": 4.7417,
        "fully_diluted_market_cap": 113087593791.73,
        "tvl": null,
        "last_updated": "2024-05-07T05:59:00.000Z"
      }
    }
  },
  {
    "id": 1839,
    "name": "BNB",
    "symbol": "BNB",
    "slug": "bnb",
    "num_market_pairs": 2154,
    "date_added": "2017-07-25T00:00:00.000Z",
    "tags": [
      "marketplace",
      "centralized-exchange",
      "payments",
      "smart-contracts",
      "alameda-research-portfolio",
      "multicoin-capital-portfolio",
      "bnb-chain",
      "layer-1",
      "sec-security-token",
      "alleged-sec-securities",
      "celsius-bankruptcy-estate"
    ],
    "max_supply": null,
    "circulating_supply": 147587289.2079243,
    "total_supply": 147587289.2079243,
    "infinite_supply": false,
    "platform": null,
    "cmc_rank": 4,
    "self_reported_circulating_supply": null,
    "self_reported_market_cap": null,
    "tvl_ratio": null,
    "last_updated": "2024-05-07T05:59:00.000Z",
    "quote": {
      "USD": {
        "price": 588.6316168508955,
        "volume_24h": 1567802517.813795,
        "volume_change_24h": 209.9321,
        "percent_change_1h": 0.08219085,
        "percent_change_24h": -0.87206454,
        "percent_change_7d": -1.96563198,
        "percent_change_30d": -0.09783674,
        "percent_change_60d": 25.81827356,
        "percent_change_90d": 94.83887631,
        "market_cap": 86874544673.10121,
        "market_cap_dominance": 3.7125,
        "fully_diluted_market_cap": 86874544673.1,
        "tvl": null,
        "last_updated": "2024-05-07T05:59:00.000Z"
      }
    }
  },
  {
    "id": 5426,
    "name": "Solana",
    "symbol": "SOL",
    "slug": "solana",
    "num_market_pairs": 656,
    "date_added": "2020-04-10T00:00:00.000Z",
    "tags": [
      "pos",
      "platform",
      "solana-ecosystem",
      "cms-holdings-portfolio",
      "kenetic-capital-portfolio",
      "alameda-research-portfolio",
      "multicoin-capital-portfolio",
      "okx-ventures-portfolio",
      "layer-1",
      "ftx-bankruptcy-estate",
      "sec-security-token",
      "alleged-sec-securities",
      "cmc-crypto-awards-2024"
    ],
    "max_supply": null,
    "circulating_supply": 447984712.6727453,
    "total_supply": 575385800.4444152,
    "infinite_supply": true,
    "platform": null,
    "cmc_rank": 5,
    "self_reported_circulating_supply": null,
    "self_reported_market_cap": null,
    "tvl_ratio": null,
    "last_updated": "2024-05-07T05:59:00.000Z",
    "quote": {
      "USD": {
        "price": 154.93918023877333,
        "volume_24h": 3257123964.4036684,
        "volume_change_24h": 127.231,
        "percent_change_1h": -0.02245464,
        "percent_change_24h": 4.21166665,
        "percent_change_7d": 14.61206996,
        "percent_change_30d": -14.32968909,
        "percent_change_60d": 8.31001093,
        "percent_change_90d": 61.54380636,
        "market_cap": 69410384141.01756,
        "market_cap_dominance": 2.9662,
        "fully_diluted_market_cap": 89149804241.89,
        "tvl": null,
        "last_updated": "2024-05-07T05:59:00.000Z"
      }
    }
  }
];
