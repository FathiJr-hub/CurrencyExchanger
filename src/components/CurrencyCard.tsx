import { Star, X } from 'lucide-react';
import { SelectedCurrency } from '../types';

interface CurrencyCardProps {
  currency: SelectedCurrency;
  baseCurrency: string;
  onRemove: (code: string) => void;
  onToggleFavorite: (code: string) => void;
}

export function CurrencyCard({ currency, baseCurrency, onRemove, onToggleFavorite }: CurrencyCardProps) {
  const formatRate = (rate: number | undefined) => {
    if (!rate) return '...';
    return rate.toFixed(4);
  };

  const formatAmount = (rate: number | undefined) => {
    if (!rate) return '...';
    return rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1 animate-slideIn">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{currency.flag}</div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{currency.code}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{currency.country}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleFavorite(currency.code)}
            className={`p-2 rounded-lg transition-colors ${
              currency.isFavorite
                ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={currency.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`w-5 h-5 ${currency.isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onRemove(currency.code)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Remove currency"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Exchange Rate</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatRate(currency.rate)}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            1 {baseCurrency} = {formatRate(currency.rate)} {currency.code}
          </p>
        </div>

        <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Amount</p>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            {currency.symbol} {formatAmount(currency.rate)}
          </p>
        </div>
      </div>
    </div>
  );
}
