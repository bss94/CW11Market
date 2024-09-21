import Grid from '@mui/material/Grid2';
import {Card, CardContent, CardHeader, CardMedia, styled} from '@mui/material';
import React from 'react';
import {API_URL} from '../../../constants.ts';
import {StyledLink} from '../../../UI/AppToolbar/AppToolbar.tsx';

export const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  title: string;
  price: number;
  image: string | null;
}

const ProductItem: React.FC<Props> = (
  {id, title, price, image}
) => {
  return (
    <Grid size={4}>
      <StyledLink to={`/products/${id}`}>
        <Card sx={{height: '100%'}}>
          <CardHeader title={title.length > 13 ? title.slice(0, 13) + '...' : title}/>
          <ImageCardMedia image={`${API_URL}/${image}`} title={title}/>
          <CardContent>
            <strong>Price: {price} KGS</strong>
          </CardContent>
        </Card>
      </StyledLink>
    </Grid>
  );
};

export default ProductItem;