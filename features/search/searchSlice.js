// src/features/search/searchSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

// --- Entity Adapter for Search Results ---
const searchAdapter = createEntityAdapter({
  selectId: (product) => product.id,
  sortComparer: (a, b) => {
    // Default sort by relevance
    if (b.relevance && a.relevance) {
      return b.relevance - a.relevance;
    }
    return a.id - b.id;
  }
});

const initialSearchState = searchAdapter.getInitialState({
  loading: false,
  error: null,
  suggestions: [],
  filters: {},
  pagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
  },
  searchTerm: '',
  lastSearchTime: null,
});

// --- RTK Query API Slice Injection ---
export const searchSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Search Products ---
    searchProducts: builder.query({
      query: ({ 
        q, 
        category = null, 
        min_price = null, 
        max_price = null, 
        sort = null, 
        page = 1, 
        limit = 20 
      }) => {
        const params = new URLSearchParams({
          q,
          page: page.toString(),
          limit: limit.toString(),
        });
        
        if (category) params.append('category', category);
        if (min_price) params.append('min_price', min_price);
        if (max_price) params.append('max_price', max_price);
        if (sort) params.append('sort', sort);
        
        return `/search?${params.toString()}`;
      },
      transformResponse: (responseData) => {
        // Normalize search results
        const state = searchAdapter.setAll(initialSearchState, responseData.data);
        
        // Add additional search metadata
        return {
          ...state,
          searchTerm: responseData.search_term,
          pagination: {
            current_page: responseData.current_page,
            last_page: responseData.last_page,
            total: responseData.total,
            per_page: responseData.per_page,
          },
          filters: responseData.filters || {},
          lastSearchTime: new Date().toISOString(),
        };
      },
      providesTags: (result, error, arg) => 
        result 
          ? [...result.ids.map((id) => ({ type: 'Search', id })), { type: 'Search', id: 'RESULTS' }] 
          : [{ type: 'Search', id: 'RESULTS' }],
      keepUnusedDataFor: 300, // Keep for 5 minutes
    }),
    
    // --- Get Search Suggestions ---
    getSearchSuggestions: builder.query({
      query: (q) => `/search/suggest?q=${q}`,
      transformResponse: (responseData) => {
        return {
          suggestions: responseData.suggestions || [],
          products: responseData.products || [],
          categories: responseData.categories || [],
          brands: responseData.brands || [],
        };
      },
      providesTags: (result, error, q) => [{ type: 'Search', id: `SUGGESTIONS_${q}` }],
      keepUnusedDataFor: 300,
    }),
    
    // --- Get Available Filters for Search ---
    getSearchFilters: builder.query({
      query: ({ 
        q = '', 
        category = null 
      }) => {
        const params = new URLSearchParams();
        if (q) params.append('q', q);
        if (category) params.append('category', category);
        
        return `/filters?${params.toString()}`;
      },
      transformResponse: (responseData) => {
        return {
          filters: responseData.filters || {},
          stats: responseData.stats || {},
        };
      },
      providesTags: (result, error, arg) => [{ type: 'Search', id: 'FILTERS' }],
      keepUnusedDataFor: 300,
    }),
    
    // --- Track Search Impression ---
    trackSearchImpression: builder.mutation({
      query: ({ searchTerm, products }) => ({
        url: '/search/track/impression',
        method: 'POST',
        body: { searchTerm, products },
      }),
      // This is a tracking call, no optimistic update needed
    }),
    
    // --- Track Search Click ---
    trackSearchClick: builder.mutation({
      query: ({ searchTerm, productId }) => ({
        url: '/search/track/click',
        method: 'POST',
        body: { searchTerm, productId },
      }),
      // This is a tracking call, no optimistic update needed
    }),
  }),
});

// Export auto-generated hooks
export const {
  useSearchProductsQuery,
  useGetSearchSuggestionsQuery,
  useGetSearchFiltersQuery,
  useTrackSearchImpressionMutation,
  useTrackSearchClickMutation,
} = searchSlice;

// --- Memoized Selectors ---
// CORRECTED: Selector for the normalized result of searchProducts
const selectSearchResult = searchSlice.endpoints.searchProducts.select();

// Creates a selector that returns the normalized data object { ids: [...], entities: {...} }
const selectSearchData = createSelector(
  [selectSearchResult],
  (searchResult) => searchResult.data ?? initialSearchState
);

// Export selectors from the adapter
export const {
  selectAll: selectAllSearchResults,
  selectById: selectSearchResultById,
  selectIds: selectSearchResultIds,
} = searchAdapter.getSelectors((state) => selectSearchData(state) ?? initialSearchState);

// --- Custom Memoized Selectors ---
// CORRECTED: Now using selectSearchResult as the dependency instead of the same name
export const selectSearchResults = createSelector(
  [selectSearchResult],
  (result) => ({
    products: result.data ? result.data.ids.map(id => result.data.entities[id]) : [],
    searchTerm: result.data?.searchTerm || '',
    pagination: result.data?.pagination || initialSearchState.pagination,
    filters: result.data?.filters || {},
    loading: result.isLoading,
    error: result.error,
    lastSearchTime: result.data?.lastSearchTime,
  })
);

// Select search suggestions
export const selectSearchSuggestions = (searchTerm) => createSelector(
  [state => searchSlice.endpoints.getSearchSuggestions.select(searchTerm)(state)],
  (result) => ({
    suggestions: result.data?.suggestions || [],
    products: result.data?.products || [],
    categories: result.data?.categories || [],
    brands: result.data?.brands || [],
    loading: result.isLoading,
    error: result.error,
  })
);

// Select search filters
export const selectSearchFilters = (searchTerm, category) => createSelector(
  [state => searchSlice.endpoints.getSearchFilters.select({ q: searchTerm, category })(state)],
  (result) => ({
    filters: result.data?.filters || {},
    stats: result.data?.stats || {},
    loading: result.isLoading,
    error: result.error,
  })
);

// Select popular search terms
export const selectPopularSearchTerms = createSelector(
  [selectSearchResults],
  (result) => {
    // In a real implementation, this would come from an API endpoint
    // This is just a placeholder implementation
    return [
      'iPhone',
      'Laptop',
      'Smartphone',
      'Headphones',
      'Smartwatch',
      'TV',
      'Camera',
    ];
  }
);

// Select trending products from search
export const selectTrendingProducts = createSelector(
  [selectSearchResults],
  (result) => {
    // In a real implementation, this would come from an API endpoint
    // This is just a placeholder implementation
    return result.products ? result.products.slice(0, 5) : [];
  }
);


export default searchSlice;