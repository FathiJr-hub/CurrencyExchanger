import { useState, useEffect } from 'react';
import { Plus, RefreshCw, TrendingUp, AlertCircle } from 'lucide-react';
import { CurrencyCard } from './components/CurrencyCard';
import { AddCurrencyModal } from './components/AddCurrencyModal';
import { BaseCurrencySelector } from './components/BaseCurrencySelector';
import { DarkModeToggle } from './components/DarkModeToggle';
import { fetchExchangeRates } from './services/exchangeRateService';
import { getCurrencyByCode } from './data/currencies';
import { SelectedCurrency, Currency } from './types';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [selectedCurrencies, setSelectedCurrencies] = useState<SelectedCurrency[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const initialCurrencies = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD'];
    const currencies = initialCurrencies
      .map((code) => {
        const currency = getCurrencyByCode(code);
        return currency ? { ...currency, isFavorite: false } : null;
      })
      .filter((c): c is SelectedCurrency => c !== null);

    setSelectedCurrencies(currencies);
  }, []);

  useEffect(() => {
    if (selectedCurrencies.length > 0 && baseCurrency) {
      (async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchExchangeRates(baseCurrency);
          setSelectedCurrencies((prev) =>
            prev.map((currency) => ({
              ...currency,
              rate: data.conversion_rates[currency.code] || undefined,
            }))
          );
          setLastUpdated(new Date(data.time_last_update_unix * 1000));
        } catch (err) {
          setError('Failed to fetch exchange rates. Please try again.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [baseCurrency]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (selectedCurrencies.length > 0 && baseCurrency && selectedCurrencies.some((c) => !c.rate)) {
      (async () => {
        try {
          const data = await fetchExchangeRates(baseCurrency);
          setSelectedCurrencies((prev) =>
            prev.map((currency) => ({
              ...currency,
              rate: currency.rate || data.conversion_rates[currency.code] || undefined,
            }))
          );
          setLastUpdated(new Date(data.time_last_update_unix * 1000));
        } catch (err) {
          console.error('Error fetching rates:', err);
        }
      })();
    }
  }, [selectedCurrencies.length]);

  const loadExchangeRates = async () => {
    if (!baseCurrency || selectedCurrencies.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchExchangeRates(baseCurrency);

      setSelectedCurrencies((prev) =>
        prev.map((currency) => ({
          ...currency,
          rate: data.conversion_rates[currency.code] || undefined,
        }))
      );

      setLastUpdated(new Date(data.time_last_update_unix * 1000));
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCurrency = (currency: Currency) => {
    const newCurrency: SelectedCurrency = { ...currency, isFavorite: false };
    setSelectedCurrencies((prev) => [...prev, newCurrency]);
    setIsModalOpen(false);
  };

  const handleRemoveCurrency = (code: string) => {
    setSelectedCurrencies((prev) => prev.filter((currency) => currency.code !== code));
  };

  const handleToggleFavorite = (code: string) => {
    setSelectedCurrencies((prev) =>
      prev.map((currency) =>
        currency.code === code ? { ...currency, isFavorite: !currency.isFavorite } : currency
      )
    );
  };

  const handleBaseCurrencyChange = (code: string) => {
    setBaseCurrency(code);
  };

  const sortedCurrencies = [...selectedCurrencies].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return lastUpdated.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Currency Exchange
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  Live exchange rates from around the world
                </p>
              </div>
            </div>
            <DarkModeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <BaseCurrencySelector selectedCurrency={baseCurrency} onChange={handleBaseCurrencyChange} />

            <div className="flex items-center gap-3">
              {lastUpdated && (
                <div className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  Updated {formatLastUpdated()}
                </div>
              )}
              <button
                onClick={loadExchangeRates}
                disabled={isLoading || selectedCurrencies.length === 0}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Add Currency</span>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 animate-slideIn">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700 dark:hover:text-red-300"
            >
              Dismiss
            </button>
          </div>
        )}

        {selectedCurrencies.length === 0 ? (
          <div className="text-center py-16 animate-fadeIn">
            <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No currencies added yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by adding currencies to compare exchange rates
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Your First Currency
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCurrencies.map((currency) => (
              <CurrencyCard
                key={currency.code}
                currency={currency}
                baseCurrency={baseCurrency}
                onRemove={handleRemoveCurrency}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      <AddCurrencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCurrency}
        excludeCodes={[baseCurrency, ...selectedCurrencies.map((c) => c.code)]}
      />
    </div>
  );
}

export default App;
