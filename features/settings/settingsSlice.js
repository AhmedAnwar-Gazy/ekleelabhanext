// src/features/settings/settingsSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

// --- RTK Query API Slice Injection ---
export const settingsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get General Site Settings ---
    getSiteSettings: builder.query({
      query: () => '/settings',
      providesTags: ['Settings'],
      keepUnusedDataFor: 86400, // Keep for 24 hours as settings rarely change
    }),
    
    // --- Get Shipping Methods ---
    getShippingMethods: builder.query({
      query: () => '/settings/shipping',
      providesTags: ['Shipping'],
      keepUnusedDataFor: 3600, // Keep for 1 hour
    }),
    
    // --- Get Return Policy ---
    getReturnPolicy: builder.query({
      query: () => '/settings/return-policy',
      providesTags: ['Policy'],
      keepUnusedDataFor: 86400,
    }),
    
    // --- Get Privacy Policy ---
    getPrivacyPolicy: builder.query({
      query: () => '/settings/privacy',
      providesTags: ['Policy'],
      keepUnusedDataFor: 86400,
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetSiteSettingsQuery,
  useGetShippingMethodsQuery,
  useGetReturnPolicyQuery,
  useGetPrivacyPolicyQuery,
} = settingsSlice;

// --- Memoized Selectors ---
// Selector for site settings
export const selectSiteSettings = createSelector(
  [settingsSlice.endpoints.getSiteSettings.select()],
  (result) => result.data || {}
);

// Selector for shipping methods
export const selectShippingMethods = createSelector(
  [settingsSlice.endpoints.getShippingMethods.select()],
  (result) => result.data || []
);

// Selector for return policy
export const selectReturnPolicy = createSelector(
  [settingsSlice.endpoints.getReturnPolicy.select()],
  (result) => result.data || {}
);

// Selector for privacy policy
export const selectPrivacyPolicy = createSelector(
  [settingsSlice.endpoints.getPrivacyPolicy.select()],
  (result) => result.data || {}
);

// Selector for site name
export const selectSiteName = createSelector(
  [selectSiteSettings],
  (settings) => settings.name || 'My Store'
);

// Selector for site logo
export const selectSiteLogo = createSelector(
  [selectSiteSettings],
  (settings) => settings.logo || '/images/logo.png'
);

// Selector for available currencies
export const selectAvailableCurrencies = createSelector(
  [selectSiteSettings],
  (settings) => settings.currencies || []
);




export default settingsSlice;
