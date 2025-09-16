// src/features/notifications/notificationsSlice.js
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

// --- Entity Adapter for Notifications ---
const notificationsAdapter = createEntityAdapter({
  selectId: (notification) => notification.id,
  sortComparer: (a, b) => new Date(b.created_at) - new Date(a.created_at),
});

const initialNotificationsState = notificationsAdapter.getInitialState({
  loading: false,
  error: null,
  unreadCount: 0,
});

// --- RTK Query API Slice Injection ---
export const notificationsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get User Notifications ---
    getNotifications: builder.query({
      query: ({ page = 1, limit = 10, unread_only = false }) => ({
        url: '/notifications',
        params: { page, limit, unread_only }
      }),
      transformResponse: (responseData) => {
        // Normalize the array response
        const state = notificationsAdapter.setAll(
          initialNotificationsState, 
          responseData.data
        );
        
        // Calculate unread count
        const unreadCount = responseData.data.filter(n => !n.read_at).length;
        
        return {
          ...state,
          unreadCount,
        };
      },
      providesTags: (result, error, arg) => 
        result 
          ? [...result.ids.map((id) => ({ type: 'Notification', id })), { type: 'Notification', id: 'LIST' }] 
          : [{ type: 'Notification', id: 'LIST' }],
      keepUnusedDataFor: 300, // Keep for 5 minutes
    }),
    
    // --- Mark Notification as Read ---
    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: 'PUT',
      }),
      // Optimistic update for marking as read
      async onQueryStarted(notificationId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsSlice.util.updateQueryData('getNotifications', undefined, (draft) => {
            if (draft.entities[notificationId]) {
              draft.entities[notificationId].read_at = new Date().toISOString();
              draft.unreadCount = Math.max(0, draft.unreadCount - 1);
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to mark notification as read:', err);
        }
      },
      invalidatesTags: (result, error, notificationId) => 
        [{ type: 'Notification', id: notificationId }, { type: 'Notification', id: 'LIST' }],
    }),
    
    // --- Mark All Notifications as Read ---
    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: '/notifications/mark-all-read',
        method: 'PUT',
      }),
      // Optimistic update for marking all as read
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsSlice.util.updateQueryData('getNotifications', undefined, (draft) => {
            // Mark all as read
            Object.values(draft.entities).forEach(notification => {
              if (notification && !notification.read_at) {
                notification.read_at = new Date().toISOString();
              }
            });
            draft.unreadCount = 0;
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to mark all notifications as read:', err);
        }
      },
      invalidatesTags: [{ type: 'Notification', id: 'LIST' }],
    }),
    
    // --- Delete Notification ---
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}`,
        method: 'DELETE',
      }),
      // Optimistic update for deletion
      async onQueryStarted(notificationId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsSlice.util.updateQueryData('getNotifications', undefined, (draft) => {
            notificationsAdapter.removeOne(draft, notificationId);
            if (!draft.entities[notificationId]?.read_at) {
              draft.unreadCount = Math.max(0, draft.unreadCount - 1);
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Failed to delete notification:', err);
        }
      },
      invalidatesTags: (result, error, notificationId) => 
        [{ type: 'Notification', id: notificationId }, { type: 'Notification', id: 'LIST' }],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
} = notificationsSlice;

// --- Memoized Selectors ---
// Selector for notifications
export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationIds,
} = notificationsAdapter.getSelectors((state) => 
  notificationsSlice.endpoints.getNotifications.select()(state).data || initialNotificationsState
);

// Selector for unread notifications
export const selectUnreadNotifications = createSelector(
  [selectAllNotifications],
  (notifications) => notifications.filter(notification => !notification.read_at)
);

// Selector for unread count
export const selectUnreadCount = createSelector(
  [notificationsSlice.endpoints.getNotifications.select()],
  (result) => result.data?.unreadCount || 0
);

// Selector for notification categories
export const selectNotificationsByCategory = createSelector(
  [selectAllNotifications, (state, category) => category],
  (notifications, category) => 
    notifications.filter(notification => notification.category === category)
);

export default notificationsSlice;