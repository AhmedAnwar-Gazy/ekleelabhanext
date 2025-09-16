// src/features/cms/cmsSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

// --- RTK Query API Slice Injection ---
export const cmsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get Homepage Content ---
    getHomepageContent: builder.query({
      query: () => '/pages/home',
      providesTags: ['Homepage'],
      keepUnusedDataFor: 3600, // Keep for 1 hour
    }),
    
    // --- Get Static Page by Slug ---
    getStaticPage: builder.query({
      query: (slug) => `/pages/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Page', id: slug }],
      keepUnusedDataFor: 3600,
    }),
    
    // --- Get Banners ---
    getBanners: builder.query({
      query: ({ limit = 10, position = 'home' }) => ({
        url: '/banners',
        params: { limit, position }
      }),
      providesTags: (result, error, { position }) => 
        [{ type: 'Banner', id: position }, { type: 'Banner', id: 'LIST' }],
      keepUnusedDataFor: 3600,
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetHomepageContentQuery,
  useGetStaticPageQuery,
  useGetBannersQuery,
} = cmsSlice;

// --- Memoized Selectors ---
// Selector for homepage content
export const selectHomepageContent = createSelector(
  [cmsSlice.endpoints.getHomepageContent.select()],
  (result) => result.data || null
);

// Selector for static page content
export const selectStaticPageContent = createSelector(
  [cmsSlice.endpoints.getStaticPage.select()],
  (result) => result.data || null
);

// Selector for banners by position
export const selectBannersByPosition = createSelector(
  [cmsSlice.endpoints.getBanners.select()],
  (result) => result.data || []
);

export default cmsSlice;