import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../store/slices/categoriesSlice.ts';
import transactionsReducer from '../store/slices/transactionSlice.ts';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;