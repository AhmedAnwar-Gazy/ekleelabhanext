// src/features/wishlist/wishlistSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

// --- Entity Adapter for Wishlist Products ---
const wishlistAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

const initialWishlistState = wishlistAdapter.getInitialState({
  loading: false,
  error: null,
});

// --- RTK Query API Slice Injection ---
export const wishlistSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get User's Wishlist ---
    getWishlist: builder.query({
      query: () => '/wishlist',
      transformResponse: (responseData) => {
        // Normalize the array response
        return wishlistAdapter.setAll(initialWishlistState, responseData);
      },
      providesTags: (result, error, arg) => 
        result 
          ? [...result.ids.map((id) => ({ type: 'Wishlist', id })), { type: 'Wishlist', id: 'LIST' }] 
          : [{ type: 'Wishlist', id: 'LIST' }],
    }),
    
    // --- Add Product to Wishlist ---
    addToWishlist: builder.mutation({
      query: ({ product_id }) => ({
        url: '/wishlist',
        method: 'POST',
        body: { product_id },
      }),
      // Optimistic update for wishlist
      async onQueryStarted({ product_id }, { dispatch, getState, queryFulfilled }) {
        // 1. Start optimistic update for getWishlist
        const patchResultList = dispatch(
          wishlistSlice.util.updateQueryData('getWishlist', undefined, (draft) => {
            // Check if product is already in wishlist
            if (!draft.entities[product_id]) {
              // Get product details from products slice if available
              const product = getState().api.queries['getProductById']?.data;
              
              if (product && product.id === product_id) {
                wishlistAdapter.addOne(draft, product);
              } else {
                // Add placeholder with minimal info
                wishlistAdapter.addOne(draft, { id: product_id });
              }
            }
          })
        );
        
        // 2. Also update the product's wishlist status if it's cached
        const getProductEndpoint = productsSlice.endpoints.getProductById;
        if (getProductEndpoint) {
          const patchResultProduct = dispatch(
            productsSlice.util.updateQueryData('getProductById', product_id, (draft) => {
              draft.in_wishlist = true;
            })
          );
          
          try {
            await queryFulfilled;
          } catch (err) {
            patchResultList.undo();
            patchResultProduct.undo();
            console.error('Failed to add to wishlist:', err);
          }
        } else {
          try {
            await queryFulfilled;
          } catch (err) {
            patchResultList.undo();
            console.error('Failed to add to wishlist (partial):', err);
          }
        }
      },
      invalidatesTags: (result, error, { product_id }) => 
        [{ type: 'Wishlist', id: product_id }, { type: 'Wishlist', id: 'LIST' }],
    }),
    
    // --- Remove Product from Wishlist ---
    removeFromWishlist: builder.mutation({
      query: (product_id) => ({
        url: `/wishlist/${product_id}`,
        method: 'DELETE',
      }),
      // Optimistic update for wishlist removal
      async onQueryStarted(product_id, { dispatch, queryFulfilled }) {
        // 1. Start optimistic update for getWishlist
        const patchResultList = dispatch(
          wishlistSlice.util.updateQueryData('getWishlist', undefined, (draft) => {
            wishlistAdapter.removeOne(draft, product_id);
          })
        );
        
        // 2. Also update the product's wishlist status if it's cached
        const getProductEndpoint = productsSlice.endpoints.getProductById;
        if (getProductEndpoint) {
          const patchResultProduct = dispatch(
            productsSlice.util.updateQueryData('getProductById', product_id, (draft) => {
              draft.in_wishlist = false;
            })
          );
          
          try {
            await queryFulfilled;
          } catch (err) {
            patchResultList.undo();
            patchResultProduct.undo();
            console.error('Failed to remove from wishlist:', err);
          }
        } else {
          try {
            await queryFulfilled;
          } catch (err) {
            patchResultList.undo();
            console.error('Failed to remove from wishlist (partial):', err);
          }
        }
      },
      invalidatesTags: (result, error, product_id) => 
        [{ type: 'Wishlist', id: product_id }, { type: 'Wishlist', id: 'LIST' }],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistSlice;

// --- Memoized Selectors ---
// Selector for wishlist products
export const {
  selectAll: selectAllWishlistProducts,
  selectById: selectWishlistProductById,
  selectIds: selectWishlistProductIds,
} = wishlistAdapter.getSelectors((state) => 
  wishlistSlice.endpoints.getWishlist.select()(state).data || initialWishlistState
);

// Selector for wishlist count
export const selectWishlistCount = createSelector(
  [selectAllWishlistProducts],
  (products) => products.length
);

// Selector for checking if product is in wishlist
export const selectIsProductInWishlist = createSelector(
  [selectAllWishlistProducts, (state, productId) => productId],
  (wishlistProducts, productId) => 
    wishlistProducts.some(product => product.id === productId)
);

export default wishlistSlice;