// src/features/auth/authSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

// Token management utilities
const tokenManager = {
  setToken: (token) => {
    try {
      localStorage.setItem('accessToken', token);
      // Dispatch a custom event to notify components about auth changes
      window.dispatchEvent(new Event('authChange'));
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  },
  
  getToken: () => {
    try {
      return localStorage.getItem('accessToken');
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  },
  
  removeToken: () => {
    try {
      localStorage.removeItem('accessToken');
      window.dispatchEvent(new Event('authChange'));
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  },
  
  isTokenExpired: () => {
    const token = tokenManager.getToken();
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Failed to parse token:', error);
      return true;
    }
  }
};

// Error handling utility
const handleAuthError = (error, context = 'Auth operation') => {
  console.error(`${context} failed:`, error);
  return error;
};

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Register New User ---
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          // Save token directly from registration response
          if (data.access_token) {
            tokenManager.setToken(data.access_token);
            // Prefetch user data after successful registration
            dispatch(authSlice.util.prefetch('getMe', undefined, { force: true }));
          }
        } catch (err) {
          handleAuthError(err, 'Registration');
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          tokenManager.setToken(data.access_token);
          // Prefetch user data after successful login
          dispatch(authSlice.util.prefetch('getMe', undefined, { force: true }));
        } catch (err) {
          const error = handleAuthError(err, 'Login');
          throw error;
        }
      },
      invalidatesTags: ['User'],
    }),
    
    // --- Token Refresh ---
    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        body: { refresh_token: tokenManager.getToken() },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          tokenManager.setToken(data.access_token);
        } catch (err) {
          const error = handleAuthError(err, 'Token refresh');
          throw error;
        }
      },
    }),
    
    // --- Logout User ---
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenManager.getToken()}`,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleAuthError(err, 'Logout');
        } finally {
          // Always cleanup on logout, even if request fails
          tokenManager.removeToken();
          dispatch(apiSlice.util.invalidateTags(['User', 'Cart', 'Wishlist', 'Order']));
        }
      },
    }),
    
    // --- Get Current User Profile ---
    getMe: builder.query({
      query: () => {
        const token = tokenManager.getToken();
        return {
          url: '/auth/me',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ['User'],
      keepUnusedDataFor: 3600,
      transformResponse: (response) => response,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err?.error?.status === 401) {
            //tokenManager.removeToken();
          }
        }
      },
    }),
    
    // --- Update User Profile ---
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/auth/me',
        method: 'PUT',
        body: profileData,
        headers: {
          Authorization: `Bearer ${tokenManager.getToken()}`,
        },
      }),
      async onQueryStarted(profileData, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authSlice.util.updateQueryData('getMe', undefined, (draft) => {
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
          const error = handleAuthError(err, 'Profile update');
          throw error;
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
        headers: {
          Authorization: `Bearer ${tokenManager.getToken()}`,
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          const error = handleAuthError(err, 'Password change');
          throw error;
        }
      },
    }),
    
    // --- Forgot Password ---
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          const error = handleAuthError(err, 'Password reset request');
          throw error;
        }
      },
    }),
    
    // --- Reset Password ---
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: resetData,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          const error = handleAuthError(err, 'Password reset');
          throw error;
        }
      },
    }),
  }),
});

// Export auto-generated hooks
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authSlice;

// --- Memoized Selectors ---
export const selectCurrentUser = createSelector(
  [authSlice.endpoints.getMe.select()],
  (result) => result.data ?? null
);

export const selectIsAuthenticated = createSelector(
  [authSlice.endpoints.getMe.select(), () => tokenManager.getToken()],
  (result, token) => !!token && !tokenManager.isTokenExpired() && !!result.data && !result.isError
);

export const selectAuthLoading = createSelector(
  [authSlice.endpoints.getMe.select()],
  (result) => result.isLoading
);

export const selectAuthError = createSelector(
  [authSlice.endpoints.getMe.select()],
  (result) => result.error
);

// Utility function to check auth status
export const checkAuthStatus = () => {
  const token = tokenManager.getToken();
  return !!token && !tokenManager.isTokenExpired();
};

// Utility to get the token
export const getAuthToken = () => tokenManager.getToken();

export default authSlice;