import Grid from '@mui/material/Grid2';
import CategoriesMenu from './Categories/CategoriesMenu.tsx';
import ProductsList from './components/ProductsList.tsx';


const Products = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={2}>
        <CategoriesMenu/>
      </Grid>
      <Grid size={10}>
        <ProductsList/>
      </Grid>
    </Grid>
  );
};

export default Products;