import { useState } from 'react';
import { useParams } from 'react-router';
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';

import { useProduct } from '../../hooks/queries';
import { ContentBox } from '../../components';
import { formatPrice } from '../../utils';

const ProductView = () => {
  const [quantity, setQuantity] = useState(1);
  const { productID } = useParams();
  const {
    isSuccess,
    isLoading,
    isError,
    data: product,
  } = useProduct(productID);
  const theme = useTheme();
  const mdMedia = useMediaQuery(theme.breakpoints.up('md'));

  const handleQtyChange = (e) => {
    const qty = Number(e.target.value);
    if (qty <= 1) {
      return;
    }
    setQuantity(qty);
  };

  return (
    <ContentBox>
      {isLoading && <CircularProgress />}

      {isError && (
        <Alert severity="error">
          <Typography variant="body1" component="span">
            Something went wrong. Please refresh the page and try again
          </Typography>
        </Alert>
      )}

      {isSuccess && (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {!mdMedia && (
            <Typography gutterBottom variant="h4" component="h3">
              {product.name}
            </Typography>
          )}
          <Box
            sx={{
              height: mdMedia ? 500 : 300,
              flex: mdMedia ? 1 : null,
              width: '100%',
              position: 'relative',
            }}
          >
            <img
              style={{
                position: 'absolute',
                margin: 'auto',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              src={product.imageUrl}
              alt={product.name}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            {mdMedia && (
              <Typography gutterBottom variant="h4" component="h3">
                {product.name}
              </Typography>
            )}
            <Typography
              gutterBottom
              sx={{
                fontWeight: 'bold',
                textAlign: mdMedia ? 'left' : 'center',
                color: theme.palette.primary.main,
              }}
              variant="h5"
              component="div"
            >
              {formatPrice(product.price)}
            </Typography>

            <Stack
              marginY={3}
              direction={{ xs: 'column', md: 'row' }}
              spacing={1}
            >
              <TextField
                onChange={handleQtyChange}
                sx={{ width: mdMedia ? 80 : '100%' }}
                value={quantity}
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                label="Quantity"
                type="number"
              />
              <Button variant="contained" size="medium">
                Add To Cart
              </Button>
              <IconButton size={mdMedia ? 'medium' : 'large'}>
                <FavoriteBorder fontSize={mdMedia ? 'medium' : 'large'} />
              </IconButton>
            </Stack>
            <Typography variant="body1" component="p">
              {product.description}
            </Typography>
          </Box>
        </Stack>
      )}
    </ContentBox>
  );
};

const view = {
  routeProps: {
    path: '/product/:productID',
    component: ProductView,
  },
  name: 'ProductView',
};

export default view;
