import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransaction } from '../../types';
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
  getTransactionById
} from '../thunks/transactionThunk.ts';
import { RootState } from '../../app/store.ts';

interface TransactionState {
  transactions: ITransaction[];
  oneTransaction: ITransaction | null;
  isFetching: boolean;
  isDeleting: boolean | string;
  isCreating: boolean;
  isEditing: boolean;
  error: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  oneTransaction: null,
  isFetching: false,
  isDeleting: false,
  isCreating: false,
  isEditing: false,
  error: false,
};

export const selectAllTransactions = (state: RootState) => state.transactions.transactions;
export const selectOneTransaction = (state: RootState) => state.transactions.oneTransaction;

export const selectIsFetching = (state: RootState) => state.transactions.isFetching;
export const selectIsCreating = (state: RootState) => state.transactions.isCreating;
export const selectIsEditing = (state: RootState) => state.transactions.isEditing;

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<ITransaction[]>) => {
        state.isFetching = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(addTransaction.pending, (state) => {
        state.isCreating = true;
        state.error = false;
      })
      .addCase(addTransaction.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addTransaction.rejected, (state) => {
        state.isCreating = false;
        state.error = true;
      })
      .addCase(getTransactionById.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(getTransactionById.fulfilled, (state, action: PayloadAction<ITransaction | null>) => {
        state.isFetching = false;
        state.oneTransaction = action.payload;
      })
      .addCase(getTransactionById.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(editTransaction.pending, (state) => {
        state.isEditing = true;
        state.error = false;
      })
      .addCase(editTransaction.fulfilled, (state) => {
        state.isEditing = false;
      })
      .addCase(editTransaction.rejected, (state) => {
        state.isEditing = false;
        state.error = true;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isDeleting = true;
        state.error = false;
      })
      .addCase(deleteTransaction.fulfilled, (state, {meta}) => {
        state.isDeleting = meta.arg;
        state.error = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.isDeleting = false;
        state.error = true;
      });
  }
});

export default transactionSlice.reducer;