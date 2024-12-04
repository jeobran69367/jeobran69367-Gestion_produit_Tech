import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  produits: [],
  categories: [],
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setProduits: (state, action) => {
      state.produits = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProduits, setCategories, setLoading, setError } = apiSlice.actions;
export default apiSlice.reducer;
