import { Typography, Alert } from '@mui/material';
import { useParams } from 'react-router';
import { CircularProgress } from '@mui/material';

import { ContentBox, ProductCard } from '../../components';
import { useProducts } from '../../hooks/queries';

const CategoryView = () => {
  const { categoryID } = useParams();
  const {
    isLoading,
    isError,
    isSuccess,
    data: products,
  } = useProducts({ categoryID });

  return (
    <ContentBox>
      {isError && (
        <Alert severity="error">
          <Typography variant="body1" component="span">
            Something went wrong. Please refresh the page and try again
          </Typography>
        </Alert>
      )}
      {isLoading && <CircularProgress />}

      {isSuccess && (
        <>
          <Typography variant="h4" component="h3">
            {products[0].category.name}
          </Typography>
          <ContentBox>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ContentBox>
        </>
      )}
    </ContentBox>
  );
};

const view = {
  routeProps: {
    path: '/category/:slug/:categoryID',
    component: CategoryView,
  },
  name: 'CategoryView',
};

export default view;
