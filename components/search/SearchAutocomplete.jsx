'use client';

// components/search/SearchAutocomplete.js
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAutocompleteQuery } from '@/features/search/searchSlice';
import { useDebounce } from '@/hooks/useDebounce';
import Image from 'next/image';

export default function SearchAutocomplete() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const router = useRouter();
  const wrapperRef = useRef(null);

  const {
    data: suggestions = [],
    isLoading,
  } = useAutocompleteQuery(
    { q: debouncedSearch, limit: 5 },
    { skip: debouncedSearch.length < 2 }
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    router.push(`/products/${suggestion.id}`);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && debouncedSearch.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" />
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="divide-y">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <button
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="w-full p-3 hover:bg-gray-50 flex items-center gap-3 text-left"
                  >
                    {suggestion.image && (
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={suggestion.image}
                          alt={suggestion.name_en}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {suggestion.name_en}
                      </p>
                      {suggestion.name_ar && (
                        <p className="text-xs text-gray-500 truncate">
                          {suggestion.name_ar}
                        </p>
                      )}
                    </div>
                    
                    <div className="text-sm font-semibold text-blue-600">
                      ${suggestion.price}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}