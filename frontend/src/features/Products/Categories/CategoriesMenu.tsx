import Grid from '@mui/material/Grid2';
import {Button} from '@mui/material';
import LoadingSpinner from '../../../UI/LoadingSpinner/LoadingSpinner.tsx';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectCategories, selectFetchCategories} from './categoriesSlice.ts';
import {useEffect} from 'react';
import {fetchCategories} from './categoriesThunks.ts';
import {fetchProducts, fetchProductsByCategory} from '../productsThunks.ts';
import {useParams} from 'react-router-dom';
import {StyledLink} from '../../../UI/AppToolbar/AppToolbar.tsx';


const CategoriesMenu = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectFetchCategories);
  const categories = useAppSelector(selectCategories);
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const selectCategory = (category?: string) => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    } else {
      dispatch(fetchProducts());
    }
  };

  return (
    <Grid container sx={{mt: 2}}>
      <LoadingSpinner loading={loading}/>
      {!loading && (<Grid size={12}>
        <Button color={!id ? 'warning' : 'primary'}
                fullWidth
                onClick={() => selectCategory()}>
          <StyledLink to={`/`}>
            All Items
          </StyledLink>
        </Button>
      </Grid>)}
      {categories.length > 0 && categories.map((category) => (
        <Grid size={12} key={category._id}>
          <Button
            color={id && category._id === id ? 'warning' : 'primary'}
            fullWidth
            onClick={() => selectCategory(category._id)}
          >
            <StyledLink to={`/category/${category._id}`}>
              {category.title}
            </StyledLink>

          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoriesMenu;