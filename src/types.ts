export interface Currency {
  code: string;
  name: string;
  country: string;
  flag: string;
  symbol: string;
}

export interface ExchangeRate {
  currency: string;
  rate: number;
}

export interface ExchangeRateResponse {
  result: string;
  base_code: string;
  conversion_rates: Record<string, number>;
  time_last_update_unix: number;
}

export interface SelectedCurrency extends Currency {
  rate?: number;
  isFavorite?: boolean;
}
