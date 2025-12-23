import { useState, useEffect } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { Currency } from '../types';
import { searchCurrencies } from '../data/currencies';

interface AddCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (currency: Currency) => void;
  excludeCodes: string[];
}

export function AddCurrencyModal({ isOpen, onClose, onAdd, excludeCodes }: AddCurrencyModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchCurrencies(searchQuery).filter(
        (currency) => !excludeCodes.includes(currency.code)
      );
      setFilteredCurrencies(results);
    } else {
      const allCurrencies = searchCurrencies('').filter(
        (currency) => !excludeCodes.includes(currency.code)
      );
      setFilteredCurrencies(allCurrencies);
    }
  }, [searchQuery, excludeCodes]);

  const handleAdd = (currency: Currency) => {
    onAdd(currency);
    setSearchQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col animate-scaleIn">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add Currency</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by country, currency name, or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filteredCurrencies.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-lg">No currencies found</p>
              <p className="text-sm mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleAdd(currency)}
                  className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all text-left group"
                >
                  <div className="text-3xl">{currency.flag}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      {currency.code}
                      <Plus className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{currency.country}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 truncate">{currency.name}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
