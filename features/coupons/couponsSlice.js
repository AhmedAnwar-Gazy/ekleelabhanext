// src/features/coupons/couponsSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

// --- RTK Query API Slice Injection ---
export const couponsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Validate Coupon Code ---
    validateCoupon: builder.query({
      query: ({ code, subtotal }) => ({
        url: '/coupons/validate',
        params: { code, subtotal }
      }),
      providesTags: (result, error, { code }) => [{ type: 'Coupon', id: code }],
      keepUnusedDataFor: 300, // Keep for 5 minutes
    }),
    
    // --- Get Active Promotions ---
    getActivePromotions: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/promotions',
        params: { page, limit }
      }),
      providesTags: (result, error, arg) => 
        result 
          ? [...result.data.map(promo => ({ type: 'Promotion', id: promo.id })), { type: 'Promotion', id: 'LIST' }] 
          : [{ type: 'Promotion', id: 'LIST' }],
      keepUnusedDataFor: 3600, // Keep for 1 hour
    }),
  }),
});

// Export auto-generated hooks
export const {
  useValidateCouponQuery,
  useGetActivePromotionsQuery,
} = couponsSlice;

// --- Memoized Selectors ---
// Selector for coupon validation result
export const selectCouponValidation = createSelector(
  [couponsSlice.endpoints.validateCoupon.select()],
  (result) => result.data || null
);

// Selector for active promotions
export const selectActivePromotions = createSelector(
  [couponsSlice.endpoints.getActivePromotions.select()],
  (result) => result.data?.data || []
);

// Selector for available promotions
export const selectAvailablePromotions = createSelector(
  [selectActivePromotions, (state, subtotal) => subtotal],
  (promotions, subtotal) => 
    promotions.filter(promo => 
      !promo.minimum_amount || (subtotal >= promo.minimum_amount)
    )
);

export default couponsSlice;