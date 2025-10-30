// src/features/search/searchSlice.js
import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

// --- Entity Adapter for Search Results Normalization ---
const searchResultsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
  // Sort by relevance (maintain search order)
  sortComparer: false,
});

const initialState = searchResultsAdapter.getInitialState({
  loading: false,
  error: null,
  facets: {},
  pagination: {
    current_page: 1,
    per_page: 20,
    total: 0,
    total_pages: 0,
  },
  searchTimeMs: 0,
  lastSearchQuery: null,
  suggestions: [],
});

// --- RTK Query API Slice Injection ---
export const searchSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Main Search with Filters and Facets ---
    searchProducts: builder.query({
      query: ({
        q = "*",
        page = 1,
        per_page = 20,
        categories = [],
        category_ids = [],
        price_range = [],
        on_sale = null,
        status = null,
        sort_by = "relevance",
        min_price = null,
        max_price = null,
      }) => {
        const params = new URLSearchParams();

        // Search query
        if (q) params.append("q", q);

        // Pagination
        params.append("page", page.toString());
        params.append("per_page", per_page.toString());

        // Categories
        if (categories && categories.length > 0) {
          categories.forEach((cat) => params.append("categories[]", cat));
        }

        // Category IDs
        if (category_ids && category_ids.length > 0) {
          category_ids.forEach((id) => params.append("category_ids[]", id));
        }

        // Price ranges
        if (price_range && price_range.length > 0) {
          price_range.forEach((range) =>
            params.append("price_range[]", range)
          );
        }

        // Min/Max price
        if (min_price !== null) params.append("min_price", min_price);
        if (max_price !== null) params.append("max_price", max_price);

        // On sale filter
        if (on_sale !== null) params.append("on_sale", on_sale.toString());

        // Status filter
        if (status !== null) params.append("status", status.toString());

        // Sort by
        if (sort_by) params.append("sort_by", sort_by);

        return `/search/products?${params.toString()}`;
      },
      transformResponse: (responseData) => {
        const products = responseData.data?.products || [];

        // Normalize the products array using the adapter
        const normalizedState = searchResultsAdapter.setAll(
          initialState,
          products
        );

        return {
          ...normalizedState,
          facets: responseData.data?.facets || {},
          pagination: responseData.data?.pagination || initialState.pagination,
          searchTimeMs: responseData.data?.search_time_ms || 0,
        };
      },
      providesTags: (result, error, arg) => {
        const tags = [{ type: "Search", id: "RESULTS" }];

        if (result && result.ids) {
          result.ids.forEach((id) => {
            tags.push({ type: "Product", id });
          });
        }

        return tags;
      },
      // Keep search results cached for 5 minutes
      keepUnusedDataFor: 300,
    }),

    // --- Autocomplete Search ---
    autocomplete: builder.query({
      query: ({ q, limit = 5 }) => {
        const params = new URLSearchParams();
        params.append("q", q);
        params.append("limit", limit.toString());

        return `/search/autocomplete?${params.toString()}`;
      },
      transformResponse: (responseData) => {
        return responseData.suggestions || [];
      },
      providesTags: (result, error, arg) => [
        { type: "Search", id: `AUTOCOMPLETE_${arg.q}` },
      ],
      // Keep autocomplete results cached for 2 minutes
      keepUnusedDataFor: 120,
    }),
  }),
});

// Export auto-generated hooks
export const {
  useSearchProductsQuery,
  useAutocompleteQuery,
  useLazySearchProductsQuery,
  useLazyAutocompleteQuery,
} = searchSlice;

// --- Selectors ---

// Selector for the search results
const selectSearchResult = (queryArgs) =>
  searchSlice.endpoints.searchProducts.select(queryArgs);

// Creates a selector that returns the normalized data
export const selectSearchData = (queryArgs) =>
  createSelector([selectSearchResult(queryArgs)], (searchResult) => {
    return searchResult.data ?? initialState;
  });

// Export selectors from the adapter
export const {
  selectAll: selectAllSearchResults,
  selectById: selectSearchResultById,
  selectIds: selectSearchResultIds,
} = searchResultsAdapter.getSelectors(
  (state, queryArgs) => selectSearchData(queryArgs)(state) ?? initialState
);

// --- Custom Memoized Selectors ---

// Select search facets
export const selectSearchFacets = (queryArgs) =>
  createSelector([selectSearchResult(queryArgs)], (searchResult) => {
    return searchResult.data?.facets || {};
  });

// Select search pagination
export const selectSearchPagination = (queryArgs) =>
  createSelector([selectSearchResult(queryArgs)], (searchResult) => {
    return searchResult.data?.pagination || initialState.pagination;
  });

// Select search time
export const selectSearchTime = (queryArgs) =>
  createSelector([selectSearchResult(queryArgs)], (searchResult) => {
    return searchResult.data?.searchTimeMs || 0;
  });

// Select search loading state
export const selectSearchLoading = (queryArgs) =>
  createSelector([selectSearchResult(queryArgs)], (searchResult) => {
    return searchResult.isLoading;
  });

// Select search error state
export const selectSearchError = (queryArgs) =>
  createSelector([selectSearchResult(queryArgs)], (searchResult) => {
    return searchResult.error;
  });

// Select if search has results
export const selectHasSearchResults = (queryArgs) =>
  createSelector([selectSearchResult(queryArgs)], (searchResult) => {
    return (searchResult.data?.ids?.length || 0) > 0;
  });

// Select total search results count
export const selectSearchResultsCount = (queryArgs) =>
  createSelector([selectSearchResult(queryArgs)], (searchResult) => {
    return searchResult.data?.pagination?.total || 0;
  });

// Select category facets with counts
export const selectCategoryFacets = (queryArgs) =>
  createSelector([selectSearchFacets(queryArgs)], (facets) => {
    return facets.categories?.values || [];
  });

// Select price range facets
export const selectPriceRangeFacets = (queryArgs) =>
  createSelector([selectSearchFacets(queryArgs)], (facets) => {
    return facets.price_range?.values || [];
  });

// Select on sale facet
export const selectOnSaleFacet = (queryArgs) =>
  createSelector([selectSearchFacets(queryArgs)], (facets) => {
    return facets.on_sale?.values || [];
  });

// Select available categories from facets
export const selectAvailableCategories = (queryArgs) =>
  createSelector([selectCategoryFacets(queryArgs)], (categoryFacets) => {
    return categoryFacets.map((facet) => ({
      name: facet.value,
      count: facet.count,
    }));
  });

// Select available price ranges from facets
export const selectAvailablePriceRanges = (queryArgs) =>
  createSelector([selectPriceRangeFacets(queryArgs)], (priceRangeFacets) => {
    return priceRangeFacets.map((facet) => ({
      range: facet.value,
      count: facet.count,
    }));
  });

// Select autocomplete suggestions
export const selectAutocompleteSuggestions = (q, limit = 5) =>
  createSelector(
    [(state) => searchSlice.endpoints.autocomplete.select({ q, limit })(state)],
    (result) => result.data || []
  );

// Select autocomplete loading state
export const selectAutocompleteLoading = (q, limit = 5) =>
  createSelector(
    [(state) => searchSlice.endpoints.autocomplete.select({ q, limit })(state)],
    (result) => result.isLoading
  );

export default searchSlice;