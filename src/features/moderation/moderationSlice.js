import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const initialState = {
  pendingContent: [],  // content awaiting approval
  flaggedContent: [],   // content flagged by users/writers/admins
  users: [],             // for admin user management
  status: 'idle',
  error: null,
};

export const fetchPendingContent = createAsyncThunk(
  'moderation/fetchPendingContent',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${BASE_URL}/moderation/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to load pending content');
      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const approveContent = createAsyncThunk(
  'moderation/approveContent',
  async (contentId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${BASE_URL}/moderation/${contentId}/approve`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to approve content');
      return contentId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const flagContent = createAsyncThunk(
  'moderation/flagContent',
  async ({ contentId, reason }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${BASE_URL}/moderation/${contentId}/flag`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) throw new Error('Failed to flag content');
      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'moderation/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to load users');
      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deactivateUser = createAsyncThunk(
  'moderation/deactivateUser',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${BASE_URL}/admin/users/${userId}/deactivate`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to deactivate user');
      return userId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const moderationSlice = createSlice({
  name: 'moderation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPendingContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pendingContent = action.payload;
      })
      .addCase(fetchPendingContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(approveContent.fulfilled, (state, action) => {
        state.pendingContent = state.pendingContent.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(flagContent.fulfilled, (state, action) => {
        state.flaggedContent.push(action.payload);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.payload);
        if (user) user.active = false;
      });
  },
});

export default moderationSlice.reducer;