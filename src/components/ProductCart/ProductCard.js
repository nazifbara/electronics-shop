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
import { ImageBox } from '..';

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
        <ImageBox
          sx={{
            flex: 3,
            height: 218,
          }}
        >
          <Link to={`/product/${product.id}`}>
            <img src={product.imageUrl} alt={product.name} />
          </Link>
        </ImageBox>
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
