// src/features/products/productsSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

// --- Entity Adapter for Normalization ---
const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
  // Sort by rating descending, then by ID
  sortComparer: (a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return a.id - b.id;
  }
});

const initialState = productsAdapter.getInitialState({
  loading: false,
  error: null,
  topProducts: [],
  newProducts: [],
  dealsProducts: [],
  relatedProducts: {},
  similarProducts: {},
});

// --- RTK Query API Slice Injection ---
export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get All Products with Filters ---
    getProducts: builder.query({
      query: ({ 
        category = null, 
        min_price = null, 
        max_price = null, 
        sort = 'newest', 
        page = 1, 
        limit = 20,
        brand = null
      }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        
        if (category) params.append('category', category);
        if (min_price) params.append('min_price', min_price);
        if (max_price) params.append('max_price', max_price);
        if (sort) params.append('sort', sort);
        if (brand) params.append('brand', brand);
        
        return `/products?${params.toString()}`;
      },
      transformResponse: (responseData) => {
        // Normalize the array response
        const state = productsAdapter.setAll(initialState, responseData.data);
        
        // Add pagination info if needed
        return {
          ...state,
          pagination: {
            current_page: responseData.current_page,
            last_page: responseData.last_page,
            total: responseData.total,
            per_page: responseData.per_page,
          }
        };
      },
      providesTags: (result, error, arg) => 
        result 
          ? [...result.ids.map((id) => ({ type: 'Product', id })), { type: 'Product', id: 'LIST' }] 
          : [{ type: 'Product', id: 'LIST' }],
    }),
    
    // --- Get Single Product by ID ---
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
      transformResponse: (responseData) => {
        // For single product, we can still use the adapter for consistency
        const state = productsAdapter.setAll(initialState, [responseData]);
        return state.entities[responseData.id];
      },
      keepUnusedDataFor: 300, // Keep for 5 minutes
    }),
    
    // --- Get Related Products ---
    getRelatedProducts: builder.query({
      query: (productId) => `/products/related/${productId}`,
      transformResponse: (responseData) => {
        // Normalize related products
        return productsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, productId) => 
        [{ type: 'Product', id: `RELATED_${productId}` }],
      keepUnusedDataFor: 300,
    }),
    
    // --- Get Similar Products ---
    getSimilarProducts: builder.query({
      query: (productId) => `/products/similar/${productId}`,
      transformResponse: (responseData) => {
        // Normalize similar products
        return productsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, productId) => 
        [{ type: 'Product', id: `SIMILAR_${productId}` }],
      keepUnusedDataFor: 300,
    }),
    
    // --- Get Top-Selling Products ---
    getTopProducts: builder.query({
      query: ({ limit = 10 }) => `/products/top?limit=${limit}`,
      transformResponse: (responseData) => {
        // Normalize top products
        return productsAdapter.setAll(initialState, responseData);
      },
      providesTags: [{ type: 'Product', id: 'TOP' }],
      keepUnusedDataFor: 3600, // Keep for 1 hour
    }),
    
    // --- Get Newly Added Products ---
    getNewProducts: builder.query({
      query: ({ limit = 10 }) => `/products/new?limit=${limit}`,
      transformResponse: (responseData) => {
        // Normalize new products
        return productsAdapter.setAll(initialState, responseData);
      },
      providesTags: [{ type: 'Product', id: 'NEW' }],
      keepUnusedDataFor: 3600,
    }),
    
    // --- Get Products on Sale (Deals) ---
    getDealsProducts: builder.query({
      query: ({ limit = 10 }) => `/products/deals?limit=${limit}`,
      transformResponse: (responseData) => {
        // Normalize deals products
        return productsAdapter.setAll(initialState, responseData);
      },
      providesTags: [{ type: 'Product', id: 'DEALS' }],
      keepUnusedDataFor: 3600,
    }),
    
    // --- Add a New Review ---
    addNewReview: builder.mutation({
      query: ({ productId, review }) => ({
        url: `/products/${productId}/reviews`,
        method: 'POST',
        body: review,
      }),
      // Optimistic Update Logic
      async onQueryStarted({ productId, review }, { dispatch, queryFulfilled }) {
        // Start optimistic update for getProductById
        const patchResultById = dispatch(
          productsSlice.util.updateQueryData('getProductById', productId, (draft) => {
            // Create a temporary review with optimistic data
            const tempReview = {
              id: `temp_${Date.now()}`,
              ...review,
              created_at: new Date().toISOString(),
              user: {
                id: 0, // Will be filled by server
                name: 'Current User'
              }
            };
            
            // Initialize reviews array if it doesn't exist
            if (!draft.reviews) draft.reviews = [];
            
            // Add new review
            draft.reviews.push(tempReview);
            
            // Update review count and rating
            draft.review_count = draft.reviews.length;
            draft.rating = draft.reviews.reduce((sum, r) => sum + r.rating, 0) / draft.reviews.length;
          })
        );
        
        // Update the list view if it's cached via getProducts
        const patchResultList = dispatch(
          productsSlice.util.updateQueryData('getProducts', undefined, (draft) => {
            if (draft.entities[productId]) {
              const product = draft.entities[productId];
              
              // Initialize reviews array if it doesn't exist
              if (!product.reviews) product.reviews = [];
              
              // Add new review
              product.reviews.push({
                id: `temp_${Date.now()}`,
                ...review,
                created_at: new Date().toISOString(),
                user: {
                  id: 0,
                  name: 'Current User'
                }
              });
              
              // Update review count and rating
              product.review_count = product.reviews.length;
              product.rating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
            }
          })
        );
        
        try {
          const { data: createdReview } = await queryFulfilled;
          
          // Update with actual data after successful creation
          dispatch(
            productsSlice.util.updateQueryData('getProductById', productId, (draft) => {
              // Find and replace temporary review with actual review
              const tempReviewIndex = draft.reviews.findIndex(r => 
                r.id.toString().startsWith('temp_')
              );
              
              if (tempReviewIndex !== -1) {
                draft.reviews[tempReviewIndex] = createdReview;
              }
            })
          );
          
          dispatch(
            productsSlice.util.updateQueryData('getProducts', undefined, (draft) => {
              if (draft.entities[productId]) {
                const product = draft.entities[productId];
                const tempReviewIndex = product.reviews.findIndex(r => 
                  r.id.toString().startsWith('temp_')
                );
                
                if (tempReviewIndex !== -1) {
                  product.reviews[tempReviewIndex] = createdReview;
                }
              }
            })
          );
        } catch (err) {
          patchResultById.undo();
          patchResultList.undo();
          console.error('Failed to add review:', err);
        }
      },
      invalidatesTags: (result, error, { productId }) => [{ type: 'Product', id: productId }],
    }),
    
    // --- Update Product (e.g., toggle wishlist) ---
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // Optimistic Update for Wishlist Toggle
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // Start optimistic update for getProductById
        const patchResultById = dispatch(
          productsSlice.util.updateQueryData('getProductById', id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        
        // Start optimistic update for getProducts list
        const patchResultList = dispatch(
          productsSlice.util.updateQueryData('getProducts', undefined, (draft) => {
            if (draft.entities[id]) {
              Object.assign(draft.entities[id], patch);
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResultById.undo();
          patchResultList.undo();
          console.error('Failed to update product:', err);
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),
    
    // --- Add Product to Wishlist ---
    addToWishlist: builder.mutation({
      query: ({ productId }) => ({
        url: '/wishlist',
        method: 'POST',
        body: { product_id: productId },
      }),
      // Optimistic Update for Wishlist
      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        // Start optimistic update for getProductById
        const patchResultById = dispatch(
          productsSlice.util.updateQueryData('getProductById', productId, (draft) => {
            draft.in_wishlist = true;
          })
        );
        
        // Start optimistic update for getProducts list
        const patchResultList = dispatch(
          productsSlice.util.updateQueryData('getProducts', undefined, (draft) => {
            if (draft.entities[productId]) {
              draft.entities[productId].in_wishlist = true;
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResultById.undo();
          patchResultList.undo();
          console.error('Failed to add to wishlist:', err);
        }
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: productId },
        { type: 'Wishlist', id: 'LIST' }
      ],
    }),
    
    // --- Remove Product from Wishlist ---
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: 'DELETE',
      }),
      // Optimistic Update for Wishlist Removal
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        // Start optimistic update for getProductById
        const patchResultById = dispatch(
          productsSlice.util.updateQueryData('getProductById', productId, (draft) => {
            draft.in_wishlist = false;
          })
        );
        
        // Start optimistic update for getProducts list
        const patchResultList = dispatch(
          productsSlice.util.updateQueryData('getProducts', undefined, (draft) => {
            if (draft.entities[productId]) {
              draft.entities[productId].in_wishlist = false;
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResultById.undo();
          patchResultList.undo();
          console.error('Failed to remove from wishlist:', err);
        }
      },
      invalidatesTags: (result, error, productId) => [
        { type: 'Product', id: productId },
        { type: 'Wishlist', id: 'LIST' }
      ],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRelatedProductsQuery,
  useGetSimilarProductsQuery,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useGetDealsProductsQuery,
  useAddNewReviewMutation,
  useUpdateProductMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = productsSlice;

// --- Memoized Selectors ---
// Selector for the normalized result of getProducts
const selectProductsResult = productsSlice.endpoints.getProducts.select();

// Creates a selector that returns the normalized data object { ids: [...], entities: {...} }
const selectProductsData = createSelector(
  [selectProductsResult],
  (productsResult) => productsResult.data ?? initialState
);

// Export selectors from the adapter
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state) => selectProductsData(state) ?? initialState);

// --- Custom Memoized Selectors ---
// Select best sellers (top products)
export const selectBestSellers = (state) => {
  const topProductsResult = productsSlice.endpoints.getTopProducts.select()(state);
  return topProductsResult?.data?.ids?.map(id => topProductsResult.data.entities[id]) || [];
};

// Select today's deals
export const selectTodayDeals = (state) => {
  const dealsResult = productsSlice.endpoints.getDealsProducts.select()(state);
  return dealsResult?.data?.ids?.map(id => dealsResult.data.entities[id]) || [];
};

// Select new arrivals
export const selectNewArrivals = (state) => {
  const newProductsResult = productsSlice.endpoints.getNewProducts.select()(state);
  return newProductsResult?.data?.ids?.map(id => newProductsResult.data.entities[id]) || [];
};

// Select products by brand
export const selectProductsByBrand = createSelector(
  [selectAllProducts, (state, brandName) => brandName],
  (products, brandName) => products.filter(product => 
    product.brand?.name?.toLowerCase() === brandName?.toLowerCase()
  )
);

// Select products by category
export const selectProductsByCategory = createSelector(
  [selectAllProducts, (state, categorySlug) => categorySlug],
  (products, categorySlug) => products.filter(product => 
    product.categories?.some(cat => cat.slug === categorySlug)
  )
);

// Select products on sale
export const selectProductsOnSale = createSelector(
  [selectAllProducts],
  (products) => products.filter(product => 
    product.special_price && product.special_price < product.price
  )
);

// Select related products for a given product ID
export const selectRelatedProducts = (productId) => createSelector(
  [state => productsSlice.endpoints.getRelatedProducts.select({ productId })(state)],
  (result) => result.data ? result.data.ids.map(id => result.data.entities[id]) : []
);

// Select similar products for a given product ID
export const selectSimilarProducts = (productId) => createSelector(
  [state => productsSlice.endpoints.getSimilarProducts.select({ productId })(state)],
  (result) => result.data ? result.data.ids.map(id => result.data.entities[id]) : []
);

// Select product loading state
export const selectProductLoading = (productId) => createSelector(
  [state => productsSlice.endpoints.getProductById.select(productId)(state)],
  (result) => result.isLoading
);

// Select product error state
export const selectProductError = (productId) => createSelector(
  [state => productsSlice.endpoints.getProductById.select(productId)(state)],
  (result) => result.error
);


export default productsSlice;
