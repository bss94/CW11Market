import {createAsyncThunk} from '@reduxjs/toolkit';
import {Category} from '../../../types.ts';
import axiosApi from '../../../axiosApi.ts';


export const fetchCategories = createAsyncThunk<Category[]>(
  'fetchCategories',
  async () => {
    const {data: categories} = await axiosApi.get<Category[]>('/categories');
    return categories;
  }
);