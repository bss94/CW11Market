import React, {useState} from 'react';
import {useAppSelector} from '../../../app/hooks.ts';
import {selectCategories} from '../Categories/categoriesSlice.ts';
import {ProductMutation} from '../../../types.ts';
import Grid from '@mui/material/Grid2';
import {MenuItem, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import FileInput from '../../../UI/FileInput/FileInput.tsx';
import {selectCreateProduct} from '../productsSlice.ts';

interface Props {
  onSubmit: (product: ProductMutation) => void;
}


const ProductsForm: React.FC<Props> = ({onSubmit}) => {
  const categories = useAppSelector(selectCategories);
  const sending = useAppSelector(selectCreateProduct);
  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    description: '',
    price: '',
    image: null,
  });
  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...state});
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid size={{md: 3, xs: 12}}>
        <TextField
          required
          fullWidth
          select
          label="Category"
          id="category"
          name="category"
          value={state.category}
          onChange={inputChangeHandler}
        >
          <MenuItem value="" disabled>
            Select category
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.title}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={12}>
        <TextField required
                   fullWidth
                   label="Title"
                   id="title"
                   name="title"
                   value={state.title}
                   onChange={inputChangeHandler}/>
      </Grid>
      <Grid size={12}>
        <TextField
          required
          fullWidth
          multiline
          minRows={3}
          label="Description"
          id="description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid size={{md: 4, xs: 12}}>
        <TextField
          required
          fullWidth
          type="number"
          label="Price"
          id="price"
          name="price"
          value={state.price}
          onChange={inputChangeHandler}/>
      </Grid>
      <Grid>
        <FileInput label="Image"
                   name="image"
                   onChange={fileInputChangeHandler}
                   required={true}
        />
      </Grid>
      <Grid>
        <LoadingButton
          type="submit"
          loading={sending}
          loadingPosition="center"
          variant="contained"
          color="warning"
        >
          <span>Send</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default ProductsForm;