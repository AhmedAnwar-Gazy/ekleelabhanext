// SearchComponent.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useSearchProductsQuery,
  useGetSearchSuggestionsQuery,
  useTrackSearchImpressionMutation,
  selectSearchResults,
  selectSearchSuggestions
} from '../search/searchSlice';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [trackImpression] = useTrackSearchImpressionMutation();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch search results
  const {
    data: searchData,
    error,
    isLoading
  } = useSearchProductsQuery({
    q: debouncedTerm,
    page: 1,
    limit: 20
  });

  // Fetch search suggestions
  const { data: suggestions } = useGetSearchSuggestionsQuery(debouncedTerm, {
    skip: debouncedTerm.length < 2
  });

  // Get results from Redux store using selector
  const results = useSelector(selectSearchResults);

  // Track search impression
  useEffect(() => {
    if (results.products.length > 0) {
      trackImpression({
        searchTerm: debouncedTerm,
        products: results.products.map(p => p.id)
      });
    }
  }, [results.products, debouncedTerm, trackImpression]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search products..."
        />
        <button type="submit">Search</button>
      </form>

      {showSuggestions && suggestions && (
        <div className="suggestions-container">
          {suggestions.suggestions.map((suggestion, index) => (
            <div key={index} onClick={() => setSearchTerm(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {isLoading && <div>Loading...</div>}
      
      {error && <div>Error: {error.message}</div>}

      <div className="search-results">
        {results.products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>

      {results.pagination.last_page > 1 && (
        <div className="pagination">
          {/* Add pagination controls here */}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;