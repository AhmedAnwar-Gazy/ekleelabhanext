// src/features/orders/ordersSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

// --- Entity Adapter for Orders ---
const ordersAdapter = createEntityAdapter({
  selectId: (order) => order.id,
  sortComparer: (a, b) => new Date(b.created_at) - new Date(a.created_at),
});

const initialOrdersState = ordersAdapter.getInitialState({
  loading: false,
  error: null,
  currentOrder: null,
});

// --- RTK Query API Slice Injection ---
export const ordersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Create Order from Cart ---
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/checkout',
        method: 'POST',
        body: orderData,
      }),
      // Optimistic update for order creation
      async onQueryStarted(orderData, { dispatch, queryFulfilled }) {
        try {
          const { data: newOrder } = await queryFulfilled;
          
          // Update orders list
          dispatch(
            ordersSlice.util.updateQueryData('getOrders', undefined, (draft) => {
              ordersAdapter.addOne(draft, newOrder);
            })
          );
          
          // Clear cart after successful order
          dispatch(cartSlice.util.invalidateTags(['Cart']));
        } catch (err) {
          console.error('Failed to create order:', err);
        }
      },
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    
    // --- Get User Orders ---
    getOrders: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/orders',
        params: { page, limit }
      }),
      transformResponse: (responseData) => {
        // Normalize the array response
        return ordersAdapter.setAll(initialOrdersState, responseData.data);
      },
      providesTags: (result, error, arg) => 
        result 
          ? [...result.ids.map((id) => ({ type: 'Order', id })), { type: 'Order', id: 'LIST' }] 
          : [{ type: 'Order', id: 'LIST' }],
      keepUnusedDataFor: 300, // Keep for 5 minutes since orders don't change frequently
    }),
    
    // --- Get Order Details ---
    getOrderDetails: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
      keepUnusedDataFor: 300,
    }),
    
    // --- Request Order Cancellation ---
    requestOrderCancellation: builder.mutation({
      query: ({ orderId, reason }) => ({
        url: `/orders/${orderId}/cancel`,
        method: 'POST',
        body: { reason }
      }),
      // Optimistic update for order cancellation request
      async onQueryStarted({ orderId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ordersSlice.util.updateQueryData('getOrderDetails', orderId, (draft) => {
            draft.cancellation_requested = true;
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to request order cancellation:', err);
        }
      },
      invalidatesTags: (result, error, { orderId }) => [{ type: 'Order', id: orderId }],
    }),
    
    // --- Request Return/Refund ---
    requestReturnRefund: builder.mutation({
      query: ({ orderId, returnData }) => ({
        url: `/orders/${orderId}/return`,
        method: 'POST',
        body: returnData,
      }),
      // Optimistic update for return request
      async onQueryStarted({ orderId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ordersSlice.util.updateQueryData('getOrderDetails', orderId, (draft) => {
            draft.return_requested = true;
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to request return/refund:', err);
        }
      },
      invalidatesTags: (result, error, { orderId }) => [{ type: 'Order', id: orderId }],
    }),
    
    // --- Download Invoice ---
    downloadInvoice: builder.query({
      query: (orderId) => ({
        url: `/invoices/${orderId}`,
        responseHandler: (response) => response.blob(),
      }),
      providesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useRequestOrderCancellationMutation,
  useRequestReturnRefundMutation,
  useDownloadInvoiceQuery,
} = ordersSlice;

// --- Memoized Selectors ---
// Selector for orders
export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = ordersAdapter.getSelectors((state) => 
  ordersSlice.endpoints.getOrders.select()(state).data || initialOrdersState
);

// Selector for processing orders
export const selectProcessingOrders = createSelector(
  [selectAllOrders],
  (orders) => orders.filter(order => 
    ['pending', 'processing', 'shipped'].includes(order.status?.code)
  )
);

// Selector for completed orders
export const selectCompletedOrders = createSelector(
  [selectAllOrders],
  (orders) => orders.filter(order => 
    ['delivered', 'completed'].includes(order.status?.code)
  )
);

// Selector for orders with issues
export const selectOrdersWithIssues = createSelector(
  [selectAllOrders],
  (orders) => orders.filter(order => 
    order.cancellation_requested || order.return_requested
  )
);


export default ordersSlice;