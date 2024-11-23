import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../api/axiosAPI.ts';
import { ICategory, ICategoryAPI, ICategoryForm } from '../../types';
import { AxiosResponse } from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories',
  async () => {
    const response: AxiosResponse<ICategoryAPI> = await axiosAPI.get<ICategoryAPI>('categories.json');

    if (response.data) {
      const categoriesApi: ICategory[] = Object.keys(response.data).map((catKey: string) => {
        return {
          ...response.data[catKey],
          id: catKey
        };
      });
      return categoriesApi.reverse();
    }
    return [];
  }
);

export const addCategory = createAsyncThunk('categories/addCategory',
  async (category: ICategoryForm) => {
    await axiosAPI.post('categories.json', {...category});
  }
);

export const getCategoryById = createAsyncThunk('categories/getCategoryById',
  async (catId: string) => {
    const response = await axiosAPI.get<ICategory | null>(`categories/${catId}.json`);

    if (!response.data) return null;
    return response.data || null;
  }
);

export const editCategory = createAsyncThunk<void, { id: string, category: ICategory }>(
  'categories/editCategory',
  async ({id, category}) => {
    await axiosAPI.put(`categories/${id}.json`, {...category});
  }
);

export const deleteCategory = createAsyncThunk<void, string>(
  'categories/deleteCategory',
  async (categoryId: string) => {
    await axiosAPI.delete(`categories/${categoryId}.json`);
  }
);
