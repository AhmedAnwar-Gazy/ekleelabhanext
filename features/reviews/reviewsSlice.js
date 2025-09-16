// src/features/reviews/reviewsSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

// --- Entity Adapter for Reviews ---
const reviewsAdapter = createEntityAdapter({
  selectId: (review) => review.id,
  sortComparer: (a, b) => new Date(b.created_at) - new Date(a.created_at),
});

const initialReviewsState = reviewsAdapter.getInitialState({
  loading: false,
  error: null,
});

// --- RTK Query API Slice Injection ---
export const reviewsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get Product Reviews ---
    getProductReviews: builder.query({
      query: ({ productId, page = 1, limit = 10, sort = 'newest' }) => ({
        url: `/reviews/product/${productId}`,
        params: { page, limit, sort }
      }),
      transformResponse: (responseData) => {
        // Normalize the array response
        return reviewsAdapter.setAll(initialReviewsState, responseData.data);
      },
      providesTags: (result, error, { productId }) => 
        [{ type: 'Review', id: `PRODUCT_${productId}` }, { type: 'Review', id: 'LIST' }],
      keepUnusedDataFor: 300, // Keep for 5 minutes
    }),
    
    // --- Get User Reviews ---
    getUserReviews: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/reviews/user',
        params: { page, limit }
      }),
      transformResponse: (responseData) => {
        // Normalize the array response
        return reviewsAdapter.setAll(initialReviewsState, responseData.data);
      },
      providesTags: (result, error, arg) => 
        [{ type: 'Review', id: 'USER' }, { type: 'Review', id: 'LIST' }],
      keepUnusedDataFor: 300,
    }),
    
    // --- Submit Review ---
    submitReview: builder.mutation({
      query: (reviewData) => ({
        url: '/reviews',
        method: 'POST',
        body: reviewData,
      }),
      // Optimistic update for review submission
      async onQueryStarted(reviewData, { dispatch, queryFulfilled }) {
        const patchResultProduct = dispatch(
          reviewsSlice.util.updateQueryData(
            'getProductReviews', 
            { productId: reviewData.product_id }, 
            (draft) => {
              // Create a temporary review with optimistic data
              const tempReview = {
                id: `temp_${Date.now()}`,
                ...reviewData,
                created_at: new Date().toISOString(),
                user: {
                  id: 0, // Will be filled by server
                  name: 'Current User'
                }
              };
              reviewsAdapter.addOne(draft, tempReview);
            }
          )
        );
        
        const patchResultUser = dispatch(
          reviewsSlice.util.updateQueryData('getUserReviews', undefined, (draft) => {
            const tempReview = {
              id: `temp_${Date.now()}`,
              ...reviewData,
              created_at: new Date().toISOString(),
              product: {
                id: reviewData.product_id,
                name: 'Loading...'
              }
            };
            reviewsAdapter.addOne(draft, tempReview);
          })
        );
        
        try {
          const {  createdReview } = await queryFulfilled;
          
          // Update with actual data after successful creation
          dispatch(
            reviewsSlice.util.updateQueryData(
              'getProductReviews', 
              { productId: reviewData.product_id }, 
              (draft) => {
                // Remove temporary review
                reviewsAdapter.removeOne(draft, `temp_${createdReview.id.split('_')[1]}`);
                // Add real review
                reviewsAdapter.addOne(draft, createdReview);
              }
            )
          );
          
          dispatch(
            reviewsSlice.util.updateQueryData('getUserReviews', undefined, (draft) => {
              reviewsAdapter.removeOne(draft, `temp_${createdReview.id.split('_')[1]}`);
              reviewsAdapter.addOne(draft, createdReview);
            })
          );
          
          // Update product rating
          dispatch(
            productsSlice.util.updateQueryData('getProductById', reviewData.product_id, (draft) => {
              if (!draft.reviews) draft.reviews = [];
              
              // Add new review to product
              draft.reviews.push(createdReview);
              
              // Update review count and rating
              draft.review_count = draft.reviews.length;
              draft.rating = draft.reviews.reduce((sum, r) => sum + r.rating, 0) / draft.reviews.length;
            })
          );
        } catch (err) {
          patchResultProduct.undo();
          patchResultUser.undo();
          console.error('Failed to submit review:', err);
        }
      },
      invalidatesTags: (result, error, { product_id }) => 
        [{ type: 'Review', id: `PRODUCT_${product_id}` }, { type: 'Review', id: 'USER' }],
    }),
    
    // --- Update Review ---
    updateReview: builder.mutation({
      query: ({ reviewId, ...reviewData }) => ({
        url: `/reviews/${reviewId}`,
        method: 'PUT',
        body: reviewData,
      }),
      // Optimistic update for review editing
      async onQueryStarted({ reviewId, ...reviewData }, { dispatch, queryFulfilled }) {
        const patchResultProduct = dispatch(
          reviewsSlice.util.updateQueryData(
            'getProductReviews', 
            { productId: reviewData.product_id }, 
            (draft) => {
              if (draft.entities[reviewId]) {
                Object.assign(draft.entities[reviewId], reviewData);
                draft.entities[reviewId].updated_at = new Date().toISOString();
              }
            }
          )
        );
        
        const patchResultUser = dispatch(
          reviewsSlice.util.updateQueryData('getUserReviews', undefined, (draft) => {
            if (draft.entities[reviewId]) {
              Object.assign(draft.entities[reviewId], reviewData);
              draft.entities[reviewId].updated_at = new Date().toISOString();
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResultProduct.undo();
          patchResultUser.undo();
          console.error('Failed to update review:', err);
        }
      },
      invalidatesTags: (result, error, { reviewId }) => 
        [{ type: 'Review', id: `PRODUCT_${result?.product_id}` }, { type: 'Review', id: 'USER' }],
    }),
    
    // --- Delete Review ---
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      // Optimistic update for review deletion
      async onQueryStarted(reviewId, { dispatch, queryFulfilled }) {
        // First, get the review details to know which product it belongs to
        let productId = null;
        
        // Try to get product ID from user reviews cache
        const userReviewsResult = reviewsSlice.endpoints.getUserReviews.select()(dispatch.getState());
        if (userReviewsResult?.data?.entities[reviewId]) {
          productId = userReviewsResult.data.entities[reviewId].product_id;
        }
        
        // If not found in user reviews, try product reviews cache
        if (!productId) {
          const productIds = Object.keys(dispatch.getState().api.queries)
            .filter(key => key.startsWith('getProductReviews'))
            .map(key => {
              const match = key.match(/getProductReviews\((\d+)\)/);
              return match ? match[1] : null;
            })
            .filter(id => id);
          
          for (const id of productIds) {
            const productReviewsResult = reviewsSlice.endpoints.getProductReviews.select({ productId: id })(dispatch.getState());
            if (productReviewsResult?.data?.entities[reviewId]) {
              productId = id;
              break;
            }
          }
        }
        
        const patchResultProduct = productId ? dispatch(
          reviewsSlice.util.updateQueryData(
            'getProductReviews', 
            { productId }, 
            (draft) => {
              reviewsAdapter.removeOne(draft, reviewId);
            }
          )
        ) : null;
        
        const patchResultUser = dispatch(
          reviewsSlice.util.updateQueryData('getUserReviews', undefined, (draft) => {
            reviewsAdapter.removeOne(draft, reviewId);
          })
        );
        
        try {
          await queryFulfilled;
          
          // Update product rating if we know the product ID
          if (productId) {
            dispatch(
              productsSlice.util.updateQueryData('getProductById', productId, (draft) => {
                if (draft.reviews) {
                  draft.reviews = draft.reviews.filter(r => r.id !== reviewId);
                  draft.review_count = draft.reviews.length;
                  draft.rating = draft.reviews.length > 0 
                    ? draft.reviews.reduce((sum, r) => sum + r.rating, 0) / draft.reviews.length 
                    : 0;
                }
              })
            );
          }
        } catch (err) {
          if (patchResultProduct) patchResultProduct.undo();
          patchResultUser.undo();
          console.error('Failed to delete review:', err);
        }
      },
      invalidatesTags: (result, error, reviewId) => 
        [{ type: 'Review', id: `PRODUCT_${result?.product_id}` }, { type: 'Review', id: 'USER' }],
    }),
    
    // --- Report Review ---
    reportReview: builder.mutation({
      query: ({ reviewId, reason }) => ({
        url: `/reviews/${reviewId}/report`,
        method: 'POST',
        body: { reason },
      }),
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetProductReviewsQuery,
  useGetUserReviewsQuery,
  useSubmitReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useReportReviewMutation,
} = reviewsSlice;

// --- Memoized Selectors ---
// Selector for reviews
export const {
  selectAll: selectAllReviews,
  selectById: selectReviewById,
  selectIds: selectReviewIds,
} = reviewsAdapter.getSelectors((state) => {
  // This is a bit complex because reviews can be in different queries
  // We'll prioritize the current query being used, but this is a simplified version
  const productReviewsResult = reviewsSlice.endpoints.getProductReviews.select()(state);
  const userReviewsResult = reviewsSlice.endpoints.getUserReviews.select()(state);
  
  // Return whichever has data, or empty state
  if (productReviewsResult?.data) return productReviewsResult.data;
  if (userReviewsResult?.data) return userReviewsResult.data;
  return initialReviewsState;
});

// Helper selector for reviews by product ID (DEFINED FIRST)
const selectReviewsByProductId = createSelector(
  [reviewsSlice.endpoints.getProductReviews.select()],
  (result) => result.data ? result.data.ids.map(id => result.data.entities[id]) : []
);

// Selector for average rating of a product (USES selectReviewsByProductId AFTER it's defined)
export const selectProductAverageRating = createSelector(
  [selectReviewsByProductId],
  (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }
);

// Selector for review count by product (USES selectReviewsByProductId AFTER it's defined)
export const selectProductReviewCount = createSelector(
  [selectReviewsByProductId],
  (reviews) => reviews ? reviews.length : 0
);



export default reviewsSlice ;