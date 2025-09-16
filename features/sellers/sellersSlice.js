// src/features/sellers/sellersSlice.js
import { createSelector ,productsSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

// --- Entity Adapter for Sellers ---
const sellersAdapter = createEntityAdapter({
  selectId: (seller) => seller.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialSellersState = sellersAdapter.getInitialState({
  loading: false,
  error: null,
});

// --- RTK Query API Slice Injection ---
export const sellersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get All Sellers ---
    getSellers: builder.query({
      query: ({ page = 1, limit = 10, status = 'active' }) => ({
        url: '/sellers',
        params: { page, limit, status }
      }),
      transformResponse: (responseData) => {
        // Normalize the array response
        return sellersAdapter.setAll(initialSellersState, responseData.data);
      },
      providesTags: (result, error, arg) => 
        result 
          ? [...result.ids.map((id) => ({ type: 'Seller', id })), { type: 'Seller', id: 'LIST' }] 
          : [{ type: 'Seller', id: 'LIST' }],
      keepUnusedDataFor: 3600, // Keep for 1 hour
    }),
    
    // --- Get Seller by ID ---
    getSellerById: builder.query({
      query: (sellerId) => `/sellers/${sellerId}`,
      providesTags: (result, error, sellerId) => [{ type: 'Seller', id: sellerId }],
      keepUnusedDataFor: 3600,
    }),
    
    // --- Get Seller Products ---
    getSellerProducts: builder.query({
      query: ({ sellerId, page = 1, limit = 20 }) => ({
        url: `/sellers/${sellerId}/products`,
        params: { page, limit }
      }),
      transformResponse: (responseData) => {
        // We'll use the productsSlice adapter to normalize this
        return productsAdapter.setAll(initialState, responseData.data);
      },
      providesTags: (result, error, { sellerId }) => 
        [{ type: 'Seller', id: sellerId }, { type: 'Product', id: 'LIST' }],
      keepUnusedDataFor: 300,
    }),
    
    // --- Apply to Become Seller ---
    applyToBecomeSeller: builder.mutation({
      query: (applicationData) => ({
        url: '/sellers/applications',
        method: 'POST',
        body: applicationData,
      }),
      // Optimistic update isn't really applicable here as it's a one-time action
      invalidatesTags: ['Seller'],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetSellersQuery,
  useGetSellerByIdQuery,
  useGetSellerProductsQuery,
  useApplyToBecomeSellerMutation,
} = sellersSlice;

// --- Memoized Selectors ---
// Selector for sellers
export const {
  selectAll: selectAllSellers,
  selectById: selectSellerById,
  selectIds: selectSellerIds,
} = sellersAdapter.getSelectors((state) => 
  sellersSlice.endpoints.getSellers.select()(state).data || initialSellersState
);

// Selector for active sellers
export const selectActiveSellers = createSelector(
  [selectAllSellers],
  (sellers) => sellers.filter(seller => seller.status === 'active')
);

// Selector for seller products (using productsSlice normalization)
export const selectSellerProducts = createSelector(
  [productsSlice.endpoints.getSellerProducts.select()],
  (result) => result.data || initialState
);



export default sellersSlice;