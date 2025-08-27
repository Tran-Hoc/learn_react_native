// app/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Tích hợp reducer của cartSlice vào store
  },
});

// Các kiểu (type) cho RootState và AppDispatch
// Điều này rất quan trọng để sử dụng TypeScript với Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;