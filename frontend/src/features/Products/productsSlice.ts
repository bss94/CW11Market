import {OneProduct, Product} from '../../types.ts';
import {createSlice} from '@reduxjs/toolkit';
import {
  createProduct,
  deleteProduct,
  fetchOneProduct,
  fetchProducts,
  fetchProductsByCategory
} from './productsThunks.ts';

export interface ProductsState {
  products: Product[];
  fetching: boolean;
  creating: boolean;
  deleting: boolean;
  oneProduct: OneProduct | null;
  fetchOne: boolean;
}

const initialState: ProductsState = {
  products: [],
  fetching: false,
  creating: false,
  deleting: false,
  oneProduct: null,
  fetchOne: true,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetOneProduct: (state) => {
      state.oneProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetching = true;
    })
      .addCase(fetchProducts.rejected, (state) => {
        state.fetching = false;
      })
      .addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
        state.products = products;
        state.fetching = false;
      });
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.fetching = true;
    })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.fetching = false;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, {payload: products}) => {
        state.products = products;
        state.fetching = false;
      });
    builder.addCase(fetchOneProduct.pending, (state) => {
      state.fetchOne = true;
    })
      .addCase(fetchOneProduct.rejected, (state) => {
        state.fetchOne = false;
      })
      .addCase(fetchOneProduct.fulfilled, (state, {payload: product}) => {
        state.oneProduct = product;
        state.fetchOne = false;
      });
    builder.addCase(deleteProduct.pending, (state) => {
      state.deleting = true;
    })
      .addCase(deleteProduct.rejected, (state) => {
        state.deleting = false;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleting = false;
      });
    builder.addCase(createProduct.pending, (state) => {
      state.creating = true;
    })
      .addCase(createProduct.rejected, (state) => {
        state.creating = false;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.creating = false;
      });


  },
  selectors: {
    selectProducts: (state) => state.products,
    selectOneProduct: (state) => state.oneProduct,
    selectFetchingProducts: (state) => state.fetching,
    selectFetchOne: (state) => state.fetchOne,
    selectDeleteProduct: (state) => state.deleting,
    selectCreateProduct: (state) => state.creating
  }
});

export const productsReducer = productsSlice.reducer;
export const {resetOneProduct} = productsSlice.actions;
export const {
  selectProducts,
  selectFetchingProducts,
  selectCreateProduct,
  selectDeleteProduct,
  selectFetchOne,
  selectOneProduct,
} = productsSlice.selectors;