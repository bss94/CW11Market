import {createAsyncThunk} from '@reduxjs/toolkit';
import {Product} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const fetchProducts = createAsyncThunk<Product[]>(
  'fetchProducts',
  async () => {
    const {data: products} = await axiosApi.get<Product[]>('/products');
    return products;
  }
);
export const fetchProductsByCategory = createAsyncThunk<Product[],string>(
  'fetchProductsByCategory',
  async (categoryId) => {
    const {data: products} = await axiosApi.get<Product[]>(`/products?category=${categoryId}`);
    return products;
  }
);