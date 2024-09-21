import {createAsyncThunk} from '@reduxjs/toolkit';
import {OneProduct, Product} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {RootState} from '../../app/store.ts';

export const fetchProducts = createAsyncThunk<Product[]>(
  'fetchProducts',
  async () => {
    const {data: products} = await axiosApi.get<Product[]>('/products');
    return products;
  }
);
export const fetchProductsByCategory = createAsyncThunk<Product[], string>(
  'fetchProductsByCategory',
  async (categoryId) => {
    const {data: products} = await axiosApi.get<Product[]>(`/products?category=${categoryId}`);
    return products;
  }
);
export const fetchOneProduct = createAsyncThunk<OneProduct, string>(
  'fetchOneProduct',
  async (productId) => {
    const {data: product} = await axiosApi.get<OneProduct>(`/products/${productId}`);
    return product;
  }
);

export const deleteProduct = createAsyncThunk<void, string, { state: RootState }>(
  'deleteProduct',
  async (productId, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`/products/${productId}`, {headers: {'Authorization': `Bearer ${token}`}});
  }
);