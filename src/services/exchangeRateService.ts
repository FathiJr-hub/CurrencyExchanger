import { ExchangeRateResponse } from '../types';

const BASE_URL = 'https://open.er-api.com/v6/latest';

export const fetchExchangeRates = async (baseCurrency: string): Promise<ExchangeRateResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/${baseCurrency}`);

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();

    if (data.result === 'error') {
      throw new Error(data.error || 'Failed to fetch exchange rates');
    }

    return {
      result: 'success',
      base_code: data.base_code,
      conversion_rates: data.rates,
      time_last_update_unix: Math.floor(Date.now() / 1000),
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};
