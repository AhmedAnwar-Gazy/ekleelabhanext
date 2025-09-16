// src/features/payments/paymentsSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

// --- RTK Query API Slice Injection ---
export const paymentsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get Available Payment Methods ---
    getPaymentMethods: builder.query({
      query: () => '/payment/methods',
      providesTags: ['PaymentMethods'],
      keepUnusedDataFor: 3600, // Keep for 1 hour as payment methods don't change often
    }),
    
    // --- Create Payment Intent ---
    createPaymentIntent: builder.mutation({
      query: (paymentData) => ({
        url: '/payment/intent',
        method: 'POST',
        body: paymentData,
      }),
      // No optimistic update needed as this creates a payment intent externally
      invalidatesTags: ['PaymentMethods'],
    }),
    
    // --- Verify Payment Result ---
    verifyPayment: builder.mutation({
      query: (verificationData) => ({
        url: '/payment/verify',
        method: 'POST',
        body: verificationData,
      }),
      // On successful verification, we can invalidate order-related data
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Invalidate order data to refresh order status
          dispatch(ordersSlice.util.invalidateTags(['Order']));
        } catch (err) {
          console.error('Payment verification failed:', err);
        }
      },
      invalidatesTags: ['PaymentMethods'],
    }),
    
    // --- Check Payment Status ---
    checkPaymentStatus: builder.query({
      query: (paymentId) => `/payment/status/${paymentId}`,
      providesTags: (result, error, paymentId) => [{ type: 'Payment', id: paymentId }],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetPaymentMethodsQuery,
  useCreatePaymentIntentMutation,
  useVerifyPaymentMutation,
  useCheckPaymentStatusQuery,
} = paymentsSlice;

// --- Memoized Selectors ---
// Selector for available payment methods
export const selectPaymentMethods = createSelector(
  [paymentsSlice.endpoints.getPaymentMethods.select()],
  (result) => result.data || []
);

// Selector for payment methods by type (e.g., 'cod', 'tabby', 'paypal')
export const selectPaymentMethodsByType = createSelector(
  [selectPaymentMethods, (state, type) => type],
  (methods, type) => methods.filter(method => method.code === type)
);

// Selector for active payment methods
export const selectActivePaymentMethods = createSelector(
  [selectPaymentMethods],
  (methods) => methods.filter(method => method.status)
);


export default paymentsSlice;
