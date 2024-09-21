import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectFetchCategories} from './Categories/categoriesSlice.ts';
import {useEffect} from 'react';
import {fetchCategories} from './Categories/categoriesThunks.ts';
import {selectUser} from '../Users/usersSlice.ts';
import {useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import {Typography} from '@mui/material';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner.tsx';
import ProductsForm from './components/ProductsForm.tsx';
import {ProductMutation} from '../../types.ts';
import {toast} from 'react-toastify';
import {createProduct} from './productsThunks.ts';

const NewProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectFetchCategories);
  const user = useAppSelector(selectUser);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    dispatch(fetchCategories());
  }, [user, navigate, dispatch]);

  const onFormSubmit = async (productMutation: ProductMutation) => {
    try {
      if (!productMutation.image) {
        toast.error('Image is required');
      } else if (productMutation.title.trim().length === 0 || productMutation.description.trim().length === 0) {
        toast.error('Title or Description has empty spaces');
      } else {
        await dispatch(createProduct(productMutation));
        navigate('/');
      }
    } catch (error) {
      toast.error('Cant create!Something wrong!');
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h4" sx={{my: 2}}>Create new product</Typography>
      </Grid>
      <LoadingSpinner loading={loading}/>
      {!loading && (<Grid size={12}>
        <ProductsForm onSubmit={onFormSubmit}/>
      </Grid>)}
    </Grid>
  );
};

export default NewProduct;