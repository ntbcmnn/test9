import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../types';
import {
  addCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
  getCategoryById
} from '../thunks/categoriesThunk.ts';
import { RootState } from '../../app/store.ts';

interface CategoriesSlice {
  categories: ICategory[];
  oneCategory: ICategory | null;
  isFetching: boolean;
  isDeleting: boolean | string;
  isCreating: boolean;
  isEditing: boolean;
  error: boolean;
}

const initialState: CategoriesSlice = {
  categories: [],
  oneCategory: null,
  isFetching: false,
  isDeleting: false,
  isCreating: false,
  isEditing: false,
  error: false,
};

export const selectAllCategories = (state: RootState) => state.categories.categories;
export const selectOneCategory = (state: RootState) => state.categories.oneCategory;

export const selectFetching = (state: RootState) => state.categories.isFetching;
export const selectCreating = (state: RootState) => state.categories.isCreating;
export const selectEditing = (state: RootState) => state.categories.isEditing;

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.isFetching = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(addCategory.pending, (state) => {
        state.isCreating = true;
        state.error = false;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addCategory.rejected, (state) => {
        state.isCreating = false;
        state.error = true;
      })
      .addCase(getCategoryById.pending, (state) => {
        state.isFetching = true;
        state.oneCategory = null;
        state.error = false;
      })
      .addCase(getCategoryById.fulfilled, (state, action: PayloadAction<ICategory | null>) => {
        state.isFetching = false;
        state.oneCategory = action.payload;
      })
      .addCase(getCategoryById.rejected, state => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(editCategory.pending, (state) => {
        state.isEditing = true;
        state.error = false;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.isEditing = false;
      })
      .addCase(editCategory.rejected, (state) => {
        state.isEditing = false;
        state.error = true;
      })
      .addCase(deleteCategory.pending, (state, {meta}) => {
        state.isDeleting = meta.arg;
        state.error = false;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isDeleting = false;
        state.error = true;
      });
  }
});

export default categoriesSlice.reducer;