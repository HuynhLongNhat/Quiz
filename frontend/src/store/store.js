// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Import slice

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
