import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const initialState = {
  items: [],       // all content (articles/videos/podcasts)
  current: null,    // currently viewed content detail
  wishlist: [],     // ids of wishlisted content
  status: 'idle',
  error: null,
};

// GET /content — list feed
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${BASE_URL}/content`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Failed to load content');
      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// GET /content/:id — single content detail
export const fetchContentById = createAsyncThunk(
  'content/fetchContentById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${BASE_URL}/content/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Content not found');
      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// POST /content — writer creates content
export const createContent = createAsyncThunk(
  'content/createContent',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${BASE_URL}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create content');
      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// POST /content/:id/comments — add a comment
export const addComment = createAsyncThunk(
  'content/addComment',
  async ({ contentId, text, parentId = null }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${BASE_URL}/content/${contentId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, parentId }),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      return res.json(); // returns updated comment tree or new comment
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const item = state.items.find((c) => c.id === action.payload);
      if (item) {
        item.liked = !item.liked;
        item.likes += item.liked ? 1 : -1;
      }
    },
    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter((wid) => wid !== id);
      } else {
        state.wishlist.push(id);
      }
    },
    clearCurrentContent: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.current) {
          state.current.comments = state.current.comments || [];
          state.current.comments.push(action.payload);
        }
      });
  },
});

export const { toggleLike, toggleWishlist, clearCurrentContent } = contentSlice.actions;
export default contentSlice.reducer;