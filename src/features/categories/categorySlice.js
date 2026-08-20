import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const initialState = {
  list: [],           // all categories: [{ id, name }]
  subscribed: [],      // ids of categories the user follows
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/categories`);
      if (!res.ok) throw new Error('Failed to load categories');
      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (name, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Failed to create category');
      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    subscribeToCategory: (state, action) => {
      if (!state.subscribed.includes(action.payload)) {
        state.subscribed.push(action.payload);
      }
    },
    unsubscribeFromCategory: (state, action) => {
      state.subscribed = state.subscribed.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const { subscribeToCategory, unsubscribeFromCategory } = categorySlice.actions;
export default categorySlice.reducer;