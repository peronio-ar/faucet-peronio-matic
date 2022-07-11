export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}

export interface IChainData {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: IAssetData;
  explorer?: string;
}

export interface ISymbol {
  label: string;
  url: string;
}

export interface ITokenAmount {
  symbol: ISymbol;
  amount: number;
}
