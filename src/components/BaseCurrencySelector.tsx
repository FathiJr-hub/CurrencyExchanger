import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { currencies, getCurrencyByCode } from '../data/currencies';

interface BaseCurrencySelectorProps {
  selectedCurrency: string;
  onChange: (code: string) => void;
}

export function BaseCurrencySelector({ selectedCurrency, onChange }: BaseCurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = getCurrencyByCode(selectedCurrency);

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
      >
        <span className="text-2xl">{selected?.flag}</span>
        <div className="text-left">
          <div className="text-sm text-gray-500 dark:text-gray-400">Base Currency</div>
          <div className="font-semibold text-gray-900 dark:text-white">{selectedCurrency}</div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 left-0 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto animate-slideDown">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Popular Currencies</h3>
            </div>
            <div className="p-2">
              {popularCurrencies.map((code) => {
                const currency = getCurrencyByCode(code);
                if (!currency) return null;
                return (
                  <button
                    key={code}
                    onClick={() => handleSelect(code)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                      code === selectedCurrency ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                    }`}
                  >
                    <span className="text-2xl">{currency.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900 dark:text-white">{currency.code}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{currency.country}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">All Currencies</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {currencies
                  .filter((c) => !popularCurrencies.includes(c.code))
                  .map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleSelect(currency.code)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm ${
                        currency.code === selectedCurrency ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                      }`}
                    >
                      <span className="text-xl">{currency.flag}</span>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-gray-900 dark:text-white">{currency.code}</span>
                        <span className="text-gray-600 dark:text-gray-400 ml-2">{currency.country}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
