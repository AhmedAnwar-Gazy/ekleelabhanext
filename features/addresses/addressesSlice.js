// src/features/addresses/addressesSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

// --- Entity Adapter for Addresses ---
const addressesAdapter = createEntityAdapter({
  selectId: (address) => address.id,
});

const initialAddressesState = addressesAdapter.getInitialState({
  loading: false,
  error: null,
  defaultAddressId: null,
});

// --- RTK Query API Slice Injection ---
export const addressesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get User Addresses ---
    getUserAddresses: builder.query({
      query: () => '/users/addresses',
      transformResponse: (responseData) => {
        // Find default address
        const defaultAddress = responseData.find(addr => addr.is_default);
        const defaultAddressId = defaultAddress ? defaultAddress.id : null;
        
        // Normalize addresses
        const state = addressesAdapter.setAll(
          initialAddressesState, 
          responseData
        );
        
        // Add default address info
        return {
          ...state,
          defaultAddressId,
        };
      },
      providesTags: (result, error, arg) => 
        result 
          ? [...result.ids.map((id) => ({ type: 'Address', id })), { type: 'Address', id: 'LIST' }] 
          : [{ type: 'Address', id: 'LIST' }],
    }),
    
    // --- Add New Address ---
    addAddress: builder.mutation({
      query: (addressData) => ({
        url: '/users/addresses',
        method: 'POST',
        body: addressData,
      }),
      // Optimistic update for adding address
      async onQueryStarted(addressData, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          addressesSlice.util.updateQueryData('getUserAddresses', undefined, (draft) => {
            // Create a temporary ID for optimistic update
            const tempId = `temp_${Date.now()}`;
            const newAddress = {
              id: tempId,
              ...addressData,
              // Ensure we have all required fields
              is_default: addressData.is_default || false,
            };
            
            // If this is set as default, unset others
            if (newAddress.is_default) {
              Object.values(draft.entities).forEach(addr => {
                if (addr && addr.is_default) {
                  addr.is_default = false;
                }
              });
              draft.defaultAddressId = tempId;
            }
            
            addressesAdapter.addOne(draft, newAddress);
          })
        );
        
        try {
          const {  createdAddress } = await queryFulfilled;
          
          // Update with actual ID after successful creation
          dispatch(
            addressesSlice.util.updateQueryData('getUserAddresses', undefined, (draft) => {
              // Remove temporary address
              addressesAdapter.removeOne(draft, `temp_${createdAddress.id.split('_')[1]}`);
              // Add real address
              addressesAdapter.addOne(draft, createdAddress);
              
              // Update default address ID if needed
              if (createdAddress.is_default) {
                draft.defaultAddressId = createdAddress.id;
              }
            })
          );
        } catch (err) {
          patchResult.undo();
          console.error('Failed to add address:', err);
        }
      },
      invalidatesTags: [{ type: 'Address', id: 'LIST' }],
    }),
    
    // --- Update Address ---
    updateAddress: builder.mutation({
      query: ({ id, ...addressData }) => ({
        url: `/users/addresses/${id}`,
        method: 'PUT',
        body: addressData,
      }),
      // Optimistic update for address update
      async onQueryStarted({ id, ...addressData }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          addressesSlice.util.updateQueryData('getUserAddresses', undefined, (draft) => {
            const address = draft.entities[id];
            if (address) {
              // Update address fields
              Object.keys(addressData).forEach(key => {
                address[key] = addressData[key];
              });
              
              // If this is set as default, unset others
              if (addressData.is_default) {
                Object.values(draft.entities).forEach(addr => {
                  if (addr && addr.id !== id && addr.is_default) {
                    addr.is_default = false;
                  }
                });
                draft.defaultAddressId = id;
              }
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to update address:', err);
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Address', id }],
    }),
    
    // --- Delete Address ---
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/users/addresses/${id}`,
        method: 'DELETE',
      }),
      // Optimistic update for address deletion
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          addressesSlice.util.updateQueryData('getUserAddresses', undefined, (draft) => {
            const address = draft.entities[id];
            if (address && address.is_default) {
              // Find another address to set as default
              const otherAddresses = Object.values(draft.entities).filter(
                addr => addr && addr.id !== id
              );
              if (otherAddresses.length > 0) {
                otherAddresses[0].is_default = true;
                draft.defaultAddressId = otherAddresses[0].id;
              } else {
                draft.defaultAddressId = null;
              }
            }
            
            addressesAdapter.removeOne(draft, id);
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to delete address:', err);
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Address', id }, { type: 'Address', id: 'LIST' }],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetUserAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressesSlice;

// --- Memoized Selectors ---
// Selector for addresses
export const {
  selectAll: selectAllAddresses,
  selectById: selectAddressById,
  selectIds: selectAddressIds,
} = addressesAdapter.getSelectors((state) => 
  addressesSlice.endpoints.getUserAddresses.select()(state).data || initialAddressesState
);

// Selector for default address
export const selectDefaultAddress = createSelector(
  [selectAllAddresses, (state) => addressesSlice.endpoints.getUserAddresses.select()(state).data?.defaultAddressId],
  (addresses, defaultAddressId) => 
    addresses.find(address => address.id === defaultAddressId) || null
);

// Selector for shipping countries and zones (if needed)
export const selectShippingLocations = createSelector(
  [selectAllAddresses],
  (addresses) => {
    // This would need to be populated from a separate API call in a real app
    // This is just a placeholder for demonstration
    return {
      countries: [
        { id: 222, name: 'Saudi Arabia', zones: [
          { id: 3513, name: 'Riyadh' },
          { id: 3514, name: 'Jeddah' },
          // ... other zones
        ]}
      ]
    };
  }
);

export default addressesSlice;