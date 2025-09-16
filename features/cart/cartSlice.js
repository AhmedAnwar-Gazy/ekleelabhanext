// src/features/cart/cartSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

// --- Entity Adapter for Cart Items ---
const cartItemsAdapter = createEntityAdapter({
  selectId: (item) => item.id,
});

const initialCartState = cartItemsAdapter.getInitialState({
  totalItems: 0,
  totalPrice: 0,
  subtotal: 0,
  discount: 0,
  shipping: 0,
  tax: 0,
  coupon: null,
  isLoading: false,
  error: null,
});

// --- RTK Query API Slice Injection ---
export const cartSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get Current Cart ---
    getCart: builder.query({
      query: () => '/cart',
      transformResponse: (responseData) => {
        // Normalize cart items
        const cartState = {
          ...responseData,
          items: responseData.items || []
        };
        
        // Handle empty cart case
        if (!cartState.items || cartState.items.length === 0) {
          return initialCartState;
        }
        
        // Create normalized state for cart items
        const normalizedState = cartItemsAdapter.setAll(
          initialCartState,
          cartState.items
        );
        
        // Add cart metadata
        return {
          ...normalizedState,
          totalItems: cartState.total_items || 0,
          totalPrice: cartState.total || 0,
          subtotal: cartState.subtotal || 0,
          discount: cartState.discount || 0,
          shipping: cartState.shipping || 0,
          tax: cartState.tax || 0,
          coupon: cartState.coupon || null,
        };
      },
      providesTags: (result, error, arg) => 
        result ? [{ type: 'Cart', id: 'CURRENT' }] : [{ type: 'Cart', id: 'CURRENT' }],
      keepUnusedDataFor: 60, // Keep cart data for 60 seconds when not in use
    }),
    
    // --- Add Item to Cart ---
    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: '/cart/items',
        method: 'POST',
        body: cartItem,
      }),
      // Optimistic update for cart
      async onQueryStarted(cartItem, { dispatch, queryFulfilled }) {
        // 1. Get current cart data
        const getCartEndpoint = cartSlice.endpoints.getCart;
        if (!getCartEndpoint) return;
        
        // 2. Create optimistic update
        const patchResult = dispatch(
          cartSlice.util.updateQueryData('getCart', undefined, (draft) => {
            // Check if item already exists in cart
            const existingItem = draft.entities[cartItem.product_id];
            if (existingItem) {
              // Update quantity
              existingItem.quantity += cartItem.quantity || 1;
            } else {
              // Add new item (simplified for example)
              const newItem = {
                id: `${cartItem.product_id}-${Date.now()}`,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity || 1,
                // Add other required properties based on your API response
                product: {
                  id: cartItem.product_id,
                  name: 'Loading...',
                  price: 0,
                  image: ''
                }
              };
              cartItemsAdapter.addOne(draft, newItem);
            }
            
            // Update totals (simplified)
            draft.totalItems = Object.values(draft.entities).reduce(
              (sum, item) => sum + (item?.quantity || 0), 0
            );
          })
        );
        
        try {
          // 3. Wait for the mutation to complete
          const { data: updatedCart } = await queryFulfilled;
          
          // 4. If successful, the optimistic update is kept
          // No additional action needed
        } catch (err) {
          // 5. If failed, undo the optimistic update
          patchResult.undo();
          console.error('Failed to add item to cart:', err);
        }
      },
      invalidatesTags: [{ type: 'Cart', id: 'CURRENT' }],
    }),
    
    // --- Update Cart Item Quantity ---
    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/cart/items/${id}`,
        method: 'PUT',
        body: { quantity },
      }),
      // Optimistic update for cart item quantity
      async onQueryStarted({ id, quantity }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartSlice.util.updateQueryData('getCart', undefined, (draft) => {
            if (draft.entities[id]) {
              draft.entities[id].quantity = quantity;
              
              // Update totals (simplified)
              draft.totalItems = Object.values(draft.entities).reduce(
                (sum, item) => sum + (item?.quantity || 0), 0
              );
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to update cart item:', err);
        }
      },
      invalidatesTags: [{ type: 'Cart', id: 'CURRENT' }],
    }),
    
    // --- Remove Item from Cart ---
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/items/${id}`,
        method: 'DELETE',
      }),
      // Optimistic update for cart item removal
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartSlice.util.updateQueryData('getCart', undefined, (draft) => {
            cartItemsAdapter.removeOne(draft, id);
            
            // Update totals (simplified)
            draft.totalItems = Object.values(draft.entities).reduce(
              (sum, item) => sum + (item?.quantity || 0), 0
            );
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to remove item from cart:', err);
        }
      },
      invalidatesTags: [{ type: 'Cart', id: 'CURRENT' }],
    }),
    
    // --- Clear Entire Cart ---
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      // Optimistic update for clearing cart
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartSlice.util.updateQueryData('getCart', undefined, (draft) => {
            cartItemsAdapter.removeAll(draft);
            // Reset cart metadata
            draft.totalItems = 0;
            draft.totalPrice = 0;
            draft.subtotal = 0;
            draft.discount = 0;
            draft.shipping = 0;
            draft.tax = 0;
            draft.coupon = null;
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to clear cart:', err);
        }
      },
      invalidatesTags: [{ type: 'Cart', id: 'CURRENT' }],
    }),
    
    // --- Apply Coupon ---
    applyCoupon: builder.mutation({
      query: ({ code }) => ({
        url: '/coupons/validate',
        method: 'GET',
        params: { code },
      }),
      // Optimistic update for coupon application
      async onQueryStarted({ code }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartSlice.util.updateQueryData('getCart', undefined, (draft) => {
            draft.coupon = { code };
          })
        );
        
        try {
          const { data } = await queryFulfilled;
          // Update with actual coupon data
          dispatch(
            cartSlice.util.updateQueryData('getCart', undefined, (draft) => {
              draft.coupon = data.coupon;
              draft.discount = data.discount;
              draft.totalPrice = draft.subtotal - draft.discount + draft.shipping + draft.tax;
            })
          );
        } catch (err) {
          patchResult.undo();
          console.error('Failed to apply coupon:', err);
        }
      },
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useApplyCouponMutation,
} = cartSlice;

// --- Memoized Selectors ---
// Selector for cart items
export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemIds,
} = cartItemsAdapter.getSelectors((state) => 
  cartSlice.endpoints.getCart.select()(state).data || initialCartState
);

// Selector for cart totals
export const selectCartTotals = createSelector(
  [cartSlice.endpoints.getCart.select()],
  (cartResult) => {
    const cart = cartResult.data;
    return {
      totalItems: cart?.totalItems || 0,
      totalPrice: cart?.totalPrice || 0,
      subtotal: cart?.subtotal || 0,
      discount: cart?.discount || 0,
      shipping: cart?.shipping || 0,
      tax: cart?.tax || 0,
      coupon: cart?.coupon || null,
    };
  }
);

// Selector for cart loading state
export const selectCartLoading = createSelector(
  [cartSlice.endpoints.getCart.select()],
  (result) => result.isLoading
);

export default cartSlice;