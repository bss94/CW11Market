import {createAsyncThunk} from '@reduxjs/toolkit';
import {OneProduct, Product, ProductMutation} from '../../types.ts';
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
export const createProduct = createAsyncThunk<void, ProductMutation, { state: RootState }>(
  'createProduct',
  async (productMutation, {getState}) => {
    const token = getState().users.user?.token;
    const formData = new FormData();
    formData.append('category', productMutation.category);
    formData.append('title', productMutation.title.trim());
    formData.append('description', productMutation.description.trim());
    formData.append('price', productMutation.price);
    if (productMutation.image) {
      formData.append('image', productMutation.image);
    }
    await axiosApi.post('/products', formData, {headers: {'Authorization': `Bearer ${token}`}});
  });