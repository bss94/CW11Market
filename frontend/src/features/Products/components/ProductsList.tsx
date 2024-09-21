import Grid from '@mui/material/Grid2';
import LoadingSpinner from '../../../UI/LoadingSpinner/LoadingSpinner.tsx';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectFetchingProducts, selectProducts} from '../productsSlice.ts';
import {useEffect} from 'react';
import {fetchProducts, fetchProductsByCategory} from '../productsThunks.ts';
import ProductItem from './ProductItem.tsx';
import {Typography} from '@mui/material';
import {selectCategories} from '../Categories/categoriesSlice.ts';
import {useParams} from 'react-router-dom';

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProducts);
  const loading = useAppSelector(selectFetchingProducts);
  const {id} = useParams();
  const categories = useAppSelector(selectCategories);
  const title = categories.find((el) => el._id === id)?.title;


  useEffect(() => {
    if (id) {
      dispatch(fetchProductsByCategory(id));
    } else {
      dispatch(fetchProducts());
    }
  }, [id, dispatch]);

  return (
    <Grid container spacing={1}>
      {!loading && <Grid size={12}>
        <Typography variant="h4" sx={{my: 2}}>{title ? title : 'All items'}</Typography>
      </Grid>}

      <LoadingSpinner loading={loading}/>
      {!loading && product.length > 0 ? product.map(product => (
          <ProductItem key={product._id} image={product.image} title={product.title} price={product.price}
                       id={product._id}/>
        ))
        : !loading &&
        <Grid size={12}>
          <Typography variant="h4">Products not found</Typography>
        </Grid>
      }
    </Grid>
  );
};

export default ProductsList;