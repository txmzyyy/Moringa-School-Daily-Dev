import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import contentReducer from '../features/content/contentSlice';
import categoryReducer from '../features/categories/categorySlice';
import moderationReducer from '../features/moderation/moderationSlice';
import notificationReducer from '../features/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    categories: categoryReducer,
    moderation: moderationReducer,
    notifications: notificationReducer,
  },
});

export default store;