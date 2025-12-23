import { Currency } from '../types';

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', country: 'United States', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', country: 'European Union', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'Pound Sterling', country: 'United Kingdom', flag: '🇬🇧', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', country: 'Japan', flag: '🇯🇵', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', country: 'Switzerland', flag: '🇨🇭', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', country: 'China', flag: '🇨🇳', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', country: 'India', flag: '🇮🇳', symbol: '₹' },
  { code: 'MXN', name: 'Mexican Peso', country: 'Mexico', flag: '🇲🇽', symbol: '$' },
  { code: 'BRL', name: 'Brazilian Real', country: 'Brazil', flag: '🇧🇷', symbol: 'R$' },
  { code: 'ZAR', name: 'South African Rand', country: 'South Africa', flag: '🇿🇦', symbol: 'R' },
  { code: 'RUB', name: 'Russian Ruble', country: 'Russia', flag: '🇷🇺', symbol: '₽' },
  { code: 'KRW', name: 'South Korean Won', country: 'South Korea', flag: '🇰🇷', symbol: '₩' },
  { code: 'SGD', name: 'Singapore Dollar', country: 'Singapore', flag: '🇸🇬', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', country: 'Hong Kong', flag: '🇭🇰', symbol: 'HK$' },
  { code: 'NOK', name: 'Norwegian Krone', country: 'Norway', flag: '🇳🇴', symbol: 'kr' },
  { code: 'SEK', name: 'Swedish Krona', country: 'Sweden', flag: '🇸🇪', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', country: 'Denmark', flag: '🇩🇰', symbol: 'kr' },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'New Zealand', flag: '🇳🇿', symbol: 'NZ$' },
  { code: 'PLN', name: 'Polish Zloty', country: 'Poland', flag: '🇵🇱', symbol: 'zł' },
  { code: 'TRY', name: 'Turkish Lira', country: 'Turkey', flag: '🇹🇷', symbol: '₺' },
  { code: 'AED', name: 'UAE Dirham', country: 'United Arab Emirates', flag: '🇦🇪', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', country: 'Saudi Arabia', flag: '🇸🇦', symbol: '﷼' },
  { code: 'THB', name: 'Thai Baht', country: 'Thailand', flag: '🇹🇭', symbol: '฿' },
  { code: 'MYR', name: 'Malaysian Ringgit', country: 'Malaysia', flag: '🇲🇾', symbol: 'RM' },
  { code: 'IDR', name: 'Indonesian Rupiah', country: 'Indonesia', flag: '🇮🇩', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', country: 'Philippines', flag: '🇵🇭', symbol: '₱' },
  { code: 'CZK', name: 'Czech Koruna', country: 'Czech Republic', flag: '🇨🇿', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', country: 'Hungary', flag: '🇭🇺', symbol: 'Ft' },
  { code: 'ILS', name: 'Israeli Shekel', country: 'Israel', flag: '🇮🇱', symbol: '₪' },
  { code: 'CLP', name: 'Chilean Peso', country: 'Chile', flag: '🇨🇱', symbol: '$' },
  { code: 'ARS', name: 'Argentine Peso', country: 'Argentina', flag: '🇦🇷', symbol: '$' },
  { code: 'COP', name: 'Colombian Peso', country: 'Colombia', flag: '🇨🇴', symbol: '$' },
  { code: 'EGP', name: 'Egyptian Pound', country: 'Egypt', flag: '🇪🇬', symbol: '£' },
  { code: 'NGN', name: 'Nigerian Naira', country: 'Nigeria', flag: '🇳🇬', symbol: '₦' },
  { code: 'PKR', name: 'Pakistani Rupee', country: 'Pakistan', flag: '🇵🇰', symbol: '₨' },
  { code: 'VND', name: 'Vietnamese Dong', country: 'Vietnam', flag: '🇻🇳', symbol: '₫' },
  { code: 'BDT', name: 'Bangladeshi Taka', country: 'Bangladesh', flag: '🇧🇩', symbol: '৳' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', country: 'Ukraine', flag: '🇺🇦', symbol: '₴' },
];

export const getCurrencyByCode = (code: string): Currency | undefined => {
  return currencies.find((currency) => currency.code === code);
};

export const searchCurrencies = (query: string): Currency[] => {
  const lowerQuery = query.toLowerCase();
  return currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(lowerQuery) ||
      currency.name.toLowerCase().includes(lowerQuery) ||
      currency.country.toLowerCase().includes(lowerQuery)
  );
};
