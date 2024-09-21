import Grid from '@mui/material/Grid2';
import LoadingSpinner from '../../../UI/LoadingSpinner/LoadingSpinner.tsx';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectFetchingProducts, selectProducts} from '../productsSlice.ts';
import {useEffect} from 'react';
import {fetchProducts} from '../productsThunks.ts';

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProducts);
  const loading = useAppSelector(selectFetchingProducts);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <LoadingSpinner loading={loading}/>
      {!loading && product.length > 0 && product.map(product => (
        <strong>{product.title}</strong>
      ))}
    </Grid>
  );
};

export default ProductsList;