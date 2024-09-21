import {Category} from '../../../types.ts';
import {createSlice} from '@reduxjs/toolkit';
import {fetchCategories} from './categoriesThunks.ts';

export interface CategoriesState {
  categories: Category[];
  fetching: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  fetching: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
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
  }
});
export const categoriesReducer = categoriesSlice.reducer;

export const {
  selectCategories,
  selectFetchCategories,
} = categoriesSlice.selectors;