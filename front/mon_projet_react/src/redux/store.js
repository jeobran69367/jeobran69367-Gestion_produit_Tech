import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slice';

const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});

export default store;
