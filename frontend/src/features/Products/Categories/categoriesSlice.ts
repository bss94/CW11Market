import {Category} from '../../../types.ts';
import {createSlice} from '@reduxjs/toolkit';
import {fetchCategories} from './categoriesThunks.ts';

export interface CategoriesState {
  categories: Category[];
  currentCategory: Category | null;
  fetching: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  currentCategory: null,
  fetching: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    changeCategory: (state, {payload: category}) => {
      state.currentCategory = category;
    },
    resetCategory: (state) => {
      state.currentCategory = null;
    },
    resetCategories: (state) => {
      state.categories = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetching = true;
    })
      .addCase(fetchCategories.rejected, (state) => {
        state.fetching = false;
      })
      .addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
        state.fetching = false;
        state.categories = categories;
      });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectFetchCategories: (state) => state.fetching,
    selectCurrentCategory: (state) => state.currentCategory,
  }
});
export const categoriesReducer = categoriesSlice.reducer;

export const {
  changeCategory,
  resetCategory,
  resetCategories
} = categoriesSlice.actions;
export const {
  selectCategories,
  selectFetchCategories,
  selectCurrentCategory
} = categoriesSlice.selectors;