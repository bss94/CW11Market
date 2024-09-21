import Grid from '@mui/material/Grid2';
import LoadingSpinner from '../../../UI/LoadingSpinner/LoadingSpinner.tsx';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectFetchingProducts, selectProducts} from '../productsSlice.ts';
import {useEffect} from 'react';
import {fetchProducts} from '../productsThunks.ts';
import ProductItem from './ProductItem.tsx';
import {Typography} from '@mui/material';
import {selectCurrentCategory} from '../Categories/categoriesSlice.ts';

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProducts);
  const currentCategory = useAppSelector(selectCurrentCategory);
  const loading = useAppSelector(selectFetchingProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h4" sx={{my:2}}>{currentCategory ? currentCategory.title : 'All items'}</Typography>
      </Grid>
      <LoadingSpinner loading={loading}/>
      {!loading && product.length > 0 ? product.map(product => (
        <ProductItem key={product._id} image={product.image} title={product.title} price={product.price}
                     id={product._id}/>
      ))
      :!loading &&
        <Grid size={12}>
          <Typography variant="h4">Products not found</Typography>
        </Grid>
      }
    </Grid>
  );
};

export default ProductsList;