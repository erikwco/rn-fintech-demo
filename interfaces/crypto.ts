//

export interface CryptoTicker {
  timestamp: Date;
  price: number;
  volume_24h: number;
  market_cap: number;
}


// ---------------------------------------------------------------
// Crypto Info
// ---------------------------------------------------------------
export interface CryptoInfo {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  notice: string;
  tags: string[];
  "tag-names": string[];
  "tag-groups": TagGroup[];
  urls: Urls;
  platform: CoinClass | null;
  date_added: Date;
  twitter_username: string;
  is_hidden: number;
  date_launched: Date | null;
  contract_address: ContractAddress[];
  self_reported_circulating_supply: number | null;
  self_reported_tags: null;
  self_reported_market_cap: number | null;
  infinite_supply: boolean;
}

export interface ContractAddress {
  contract_address: string;
  platform: ContractAddressPlatform;
}

export interface ContractAddressPlatform {
  name: string;
  coin: CoinClass;
}

export interface CoinClass {
  id: string;
  name: string;
  symbol: string;
  slug: string;
  token_address?: string;
}

export enum TagGroup {
  Algorithm = "ALGORITHM",
  Category = "CATEGORY",
  Industry = "INDUSTRY",
  Others = "OTHERS",
  Platform = "PLATFORM",
}

export interface Urls {
  website: string[];
  twitter: string[];
  message_board: string[];
  chat: string[];
  facebook: any[];
  explorer: string[];
  reddit: string[];
  technical_doc: string[];
  source_code: string[];
  announcement: string[];
}

// ---------------------------------------------------------------
// Crypto Listings
// ---------------------------------------------------------------
export interface Currency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: Date;
  tags: string[];
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  infinite_supply: boolean;
  platform: Platform | null;
  cmc_rank: number;
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  tvl_ratio: null;
  last_updated: Date;
  quote: Quote;
}

export interface Platform {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

export interface Quote {
  USD: Usd;
}

export interface Usd {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null;
  last_updated: Date;
}

