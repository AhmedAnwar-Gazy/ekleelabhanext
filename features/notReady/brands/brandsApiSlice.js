// src/features/auth/authSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

// --- RTK Query API Slice Injection ---
export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Register New User ---
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      // On successful registration, automatically log in
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Attempt to log in immediately after registration
          dispatch(
            authSlice.util.updateQueryData('login', undefined, (draft) => {
              Object.assign(draft, {
                email: credentials.email,
                password: credentials.password,
              });
            })
          );
        } catch (err) {
          console.error('Registration failed:', err);
        }
      },
    }),
    
    // --- Login User ---
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
      // On successful login, update the auth state
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Store the token in localStorage or secure storage
          localStorage.setItem('accessToken', data.access_token);
          // Prefetch user data after login
          dispatch(authSlice.util.prefetch('getMe', undefined, { force: true }));
        } catch (err) {
          console.error('Login failed:', err);
        }
      },
      invalidatesTags: ['User'],
    }),
    
    // --- Logout User ---
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      // On successful logout, clean up
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('accessToken');
          // Invalidate all user-related data
          dispatch(apiSlice.util.invalidateTags(['User', 'Cart', 'Wishlist', 'Order']));
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),
    
    // --- Get Current User Profile ---
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
      transformResponse: (response) => {
        // You can transform the response here if needed
        return response;
      },
      // Keep this query active for a longer time since user data doesn't change frequently
      keepUnusedDataFor: 3600,
    }),
    
    // --- Update User Profile ---
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/auth/me',
        method: 'PUT',
        body: profileData,
      }),
      // Optimistic update for user profile
      async onQueryStarted(profileData, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authSlice.util.updateQueryData('getMe', undefined, (draft) => {
            // Update the draft with new profile data
            Object.keys(profileData).forEach(key => {
              if (key !== 'id' && draft[key] !== undefined) {
                draft[key] = profileData[key];
              }
            });
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to update profile:', err);
        }
      },
      invalidatesTags: ['User'],
    }),
    
    // --- Change User Password ---
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/auth/me/password',
        method: 'PUT',
        body: passwordData,
      }),
    }),
    
    // --- Forgot Password ---
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    
    // --- Reset Password ---
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: resetData,
      }),
    }),
  }),
});

// Export auto-generated hooks
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authSlice;

// --- Memoized Selectors ---
// Selector for the user data
export const selectCurrentUser = createSelector(
  [authSlice.endpoints.getMe.select()],
  (result) => result.data
);

// Selector for authentication status
export const selectIsAuthenticated = createSelector(
  [authSlice.endpoints.getMe.select()],
  (result) => !!result.data && !result.isError
);

// Selector for user loading state
export const selectAuthLoading = createSelector(
  [authSlice.endpoints.getMe.select()],
  (result) => result.isLoading
);

export default brandsApiSlice;