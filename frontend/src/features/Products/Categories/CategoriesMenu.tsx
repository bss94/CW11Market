import Grid from '@mui/material/Grid2';
import {Button} from '@mui/material';
import LoadingSpinner from '../../../UI/LoadingSpinner/LoadingSpinner.tsx';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
  changeCategory, resetCategories,
  resetCategory,
  selectCategories,
  selectCurrentCategory,
  selectFetchCategories
} from './categoriesSlice.ts';
import {useEffect} from 'react';
import {fetchCategories} from './categoriesThunks.ts';
import {Category} from '../../../types.ts';
import {fetchProducts, fetchProductsByCategory} from '../productsThunks.ts';


const CategoriesMenu = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectFetchCategories);
  const categories = useAppSelector(selectCategories);
  const currentCategory = useAppSelector(selectCurrentCategory);

  useEffect(() => {
    dispatch(resetCategories())
    dispatch(fetchCategories());
  }, [dispatch]);

  const selectCategory = (category?: Category) => {
    if (category) {
      dispatch(changeCategory(category));
      dispatch(fetchProductsByCategory(category._id))
    } else {
      dispatch(resetCategory());
      dispatch(fetchProducts());
    }
  };

  return (
    <Grid container>
      <LoadingSpinner loading={loading}/>
      {!loading && (<Grid size={12}>
        <Button color={!currentCategory ? 'warning' : 'primary'}
                fullWidth
                onClick={() => selectCategory()}>All Items
        </Button>
      </Grid>)}
      {categories.length > 0 && categories.map((category) => (
        <Grid size={12} key={category._id}>
          <Button
            color={currentCategory && category._id === currentCategory._id ? 'warning' : 'primary'}
            fullWidth
            onClick={() => selectCategory(category)}
          >
            {category.title}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoriesMenu;