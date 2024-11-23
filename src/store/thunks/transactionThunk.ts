import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITransaction, ITransactionAPI, ITransactionForm } from '../../types';
import axiosAPI from '../../api/axiosAPI.ts';
import { AxiosResponse } from 'axios';

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions',
  async () => {
    const response: AxiosResponse<ITransactionAPI> = await axiosAPI.get<ITransactionAPI>('transactions.json');

    if (response.data) {
      const transactionsApi: ITransaction[] = Object.keys(response.data).map((trKey: string) => {
        return {
          ...response.data[trKey],
          id: trKey,
        };
      });
      return transactionsApi.reverse();
    }
    return [];
  }
);

export const addTransaction = createAsyncThunk('transactions/addTransaction',
  async (transaction: ITransactionForm) => {
    await axiosAPI.post('transactions.json', {...transaction, date: new Date().toISOString()});
  }
);

export const getTransactionById = createAsyncThunk('transactions/getTransactionById',
  async (id: string) => {
    const response = await axiosAPI.get<ITransaction | null>(`transactions/${id}.json`);

    if (!response.data) return null;
    return response.data || null;
  }
);

export const editTransaction = createAsyncThunk<void, { id: string, transaction: ITransaction }>
('transactions/editTransaction',
  async ({id, transaction}) => {
    await axiosAPI.put(`transactions/${id}.json`, {...transaction});
  }
);

export const deleteTransaction = createAsyncThunk('transactions/deleteTransaction',
  async (id: string) => {
    await axiosAPI.delete(`transactions/${id}.json`);
  }
);