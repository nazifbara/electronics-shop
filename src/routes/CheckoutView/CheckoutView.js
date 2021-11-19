import {
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  useTheme,
  Button,
} from '@mui/material';

import { ContentBox, ImageBox } from '../../components';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils';

const CheckoutView = () => {
  const { cartProducts, getTotal } = useCart();
  const theme = useTheme();

  return (
    <ContentBox>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box sx={{ flex: 4 }}>
          <Typography gutterBottom variant="h4" component="h3">
            Your Order
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartProducts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <ImageBox
                          sx={{
                            width: 60,
                            height: 60,
                          }}
                        >
                          <img src={p.imageUrl} alt={p.name} />
                        </ImageBox>
                        <span>{p.name}</span>
                      </Stack>
                    </TableCell>
                    <TableCell>{p.quantity}</TableCell>
                    <TableCell>{formatPrice(p.quantity * p.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            sx={{
              fontWeight: 'bold',
              marginTop: 1,
              color: theme.palette.primary.main,
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            Total: {formatPrice(getTotal())}
          </Typography>
        </Box>
        <Box sx={{ flex: 3 }}>
          <Typography gutterBottom variant="h4" component="h3">
            Payment Info
          </Typography>
          <form>
            <TextField
              fullWidth
              name="country"
              label="Country"
              margin="dense"
            />
            <TextField fullWidth name="city" label="City" margin="normal" />
            <TextField
              fullWidth
              name="zipCode"
              label="ZIP Code"
              margin="dense"
            />
            <TextField
              fullWidth
              name="address"
              label="Address"
              margin="dense"
            />
            <Button fullWidth variant="contained" size="medium">
              checkout
            </Button>
          </form>
        </Box>
      </Stack>
    </ContentBox>
  );
};

const view = {
  routeProps: {
    path: '/checkout',
    component: CheckoutView,
  },
  name: 'CheckoutView',
};

export default view;
