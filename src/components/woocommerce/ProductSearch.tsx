
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { WCProduct, woocommerceApi } from '@/lib/woocommerce';
import { useNavigate } from 'react-router-dom';
import { useAppSettings } from '@/contexts/AppSettingsContext';

interface ProductSearchProps {
  onSearch?: (query: string) => void;
  onSearchResults?: (results: WCProduct[]) => void;
  placeholder?: string;
  className?: string;
}

export function ProductSearch({ 
  onSearch,
  onSearchResults, 
  placeholder = "Search products...",
  className = ""
}: ProductSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WCProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { formatPrice } = useAppSettings();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([]);
        setShowResults(false);
        onSearchResults?.([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await woocommerceApi.searchProducts(query);
        setResults(searchResults.slice(0, 8)); // Limit to 8 results
        setShowResults(true);
        onSearchResults?.(searchResults);
        onSearch?.(query);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [query, onSearchResults, onSearch]);

  const handleProductClick = (product: WCProduct) => {
    setShowResults(false);
    setQuery('');
    navigate(`/product/${product.slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    onSearch?.('');
    onSearchResults?.([]);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 h-12 bg-gray-50 border-0 focus:bg-white transition-colors"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={clearSearch}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full mx-auto mb-2" />
              Searching...
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-3 border-b bg-gray-50">
                <p className="text-sm text-gray-600">
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0]?.src || '/placeholder.svg'}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {product.categories?.[0]?.name}
                        </p>
                        <p className="text-sm font-semibold text-kapraye-burgundy mt-1">
                          {formatPrice(parseFloat(product.price))}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-3 border-t bg-gray-50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowResults(false);
                    navigate(`/search?q=${encodeURIComponent(query)}`);
                  }}
                  className="w-full"
                >
                  View all results for "{query}"
                </Button>
              </div>
            </>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              No products found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
