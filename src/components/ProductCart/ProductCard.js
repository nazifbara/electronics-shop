import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';

import { Link } from '..';
import { formatPrice } from '../../utils';

const ProductCard = ({ product, ...otherProps }) => {
  const theme = useTheme();
  const mdMedia = useMediaQuery(theme.breakpoints.up(500));

  return (
    <Card sx={{ p: 1, mb: 2 }} {...otherProps}>
      <Box
        sx={
          mdMedia && {
            display: 'flex',
            flexDirection: mdMedia ? 'row' : 'column',
          }
        }
      >
        <Box
          sx={{
            flex: 3,
            height: '218px',
            width: '100%',
            position: 'relative',
          }}
        >
          <Link to={`/product/${product.id}`}>
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
          </Link>
        </Box>
        <CardContent sx={{ flex: mdMedia ? 7 : 1 }}>
          <Link to={`/product/${product.id}`}>
            <Typography gutterBottom variant="body1" component="p">
              {product.name}
            </Typography>
          </Link>
          <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
            {formatPrice(product.price)}
          </Typography>
          <CardActions>
            <IconButton size="large">
              <FavoriteBorder fontSize="large" />
            </IconButton>
          </CardActions>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCard;
