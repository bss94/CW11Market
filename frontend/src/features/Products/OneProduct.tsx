import {useEffect} from 'react';
import Grid from '@mui/material/Grid2';
import {Button, Card, CardContent, CardMedia, styled, Typography} from '@mui/material';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner.tsx';
import {resetOneProduct, selectDeleteProduct, selectFetchOne, selectOneProduct} from './productsSlice.ts';
import {deleteProduct, fetchOneProduct} from './productsThunks.ts';
import {API_URL} from '../../constants.ts';
import {selectUser} from '../Users/usersSlice.ts';
import {LoadingButton} from '@mui/lab';
import {toast} from 'react-toastify';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '100%',
});

const OneProduct = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = useAppSelector(selectOneProduct);
  const loading = useAppSelector(selectFetchOne);
  const user = useAppSelector(selectUser);
  const deleting = useAppSelector(selectDeleteProduct);

  useEffect(() => {
    dispatch(resetOneProduct());
    dispatch(fetchOneProduct(id));
  }, [dispatch, id]);

  const soldProduct = async (id: string) => {
    try {
      await dispatch(deleteProduct(id));
      toast.success('Delete successfully');
      navigate('/');
    } catch (error) {
      toast.error('Cant delete!Something wrong!');
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <Button variant="text" startIcon={<ArrowBackIcon/>} component={Link} to="/">
          Back to products
        </Button>
      </Grid>
      {product && user && (user?._id === product?.author._id) &&
        <Grid size={9} textAlign="end">
          <LoadingButton
            loading={deleting}
            loadingPosition="center"
            variant="contained"
            color="warning"
            onClick={() => {
              void soldProduct(product._id);
            }}
          >
            <span>Sold</span>
          </LoadingButton>
        </Grid>}
      <LoadingSpinner loading={loading}/>
      {product &&
        <Grid size={12}>
          <Card sx={{pb: 2}}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={4}>
                <ImageCardMedia image={`${API_URL}/${product.image}`} title={product.title}/>
              </Grid>
              <Grid size={8}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    Category: {product.category.title}
                  </Typography>
                  <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    {product.description}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    Price: {product.price} KGS
                  </Typography>
                </CardContent>
              </Grid>
              <Grid size={6}>
                <Typography variant="body1" sx={{color: 'text.secondary', px: 2}}>
                  Seller: {product.author.name}
                </Typography></Grid>
              <Grid size={6} textAlign="end" px={2}>
                <Button variant="contained" color="warning">
                  Contact: {product.author.phone}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      }
      {!loading && !product &&
        <Grid size={12}>
          <Typography variant="h4">Products not found</Typography>
        </Grid>}

    </Grid>
  );
};

export default OneProduct;