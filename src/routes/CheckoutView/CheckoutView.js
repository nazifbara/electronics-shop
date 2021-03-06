import { useState } from 'react';
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
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { API, graphqlOperation } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import { processOrder } from '../../graphql/mutations';
import { ContentBox, ImageBox } from '../../components';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils';

const CheckoutView = () => {
  const { cartProducts, getTotal } = useCart();
  const theme = useTheme();
  const [stripePromise] = useState(() =>
    loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  );

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
          <Elements stripe={stripePromise}>
            <InjectedPaymentForm />
          </Elements>
        </Box>
      </Stack>
    </ContentBox>
  );
};

const PaymentForm = ({ stripe, elements }) => {
  const history = useHistory();
  const { clearCart, getTotal, cartProducts } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    country: '',
    city: '',
    zipCode: '',
    address: '',
  });

  const handleSubmit = async (e) => {
    const { address, country } = form;
    e.preventDefault();
    if (!stripe && !elements && !address && !country) {
      return;
    }
    setLoading(true);
    try {
      await processPayment();
    } catch (error) {
      setLoading(false);
      console.error(error);
      return;
    }
    console.info('payment done');
    setLoading(false);
    clearCart();
    history.push('/orders');
  };

  const handleValueChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const processPayment = async () => {
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    await API.graphql({
      ...graphqlOperation(processOrder, {
        input: {
          cart: cartProducts.map((p) => {
            const { name, price, quantity, id } = p;
            return { name, price, quantity, id };
          }),
          token: result.token.id,
          total: getTotal(),
          ...form,
        },
      }),
    });
    clearCart();
  };
  return (
    <form>
      <TextField
        fullWidth
        value={form.country}
        onChange={handleValueChange}
        name="country"
        label="Country"
        margin="dense"
      />
      <TextField
        fullWidth
        value={form.city}
        onChange={handleValueChange}
        name="city"
        label="City"
        margin="normal"
      />
      <TextField
        fullWidth
        value={form.zipCode}
        onChange={handleValueChange}
        name="zipCode"
        label="ZIP Code"
        margin="dense"
      />
      <TextField
        fullWidth
        value={form.address}
        onChange={handleValueChange}
        name="address"
        label="Address"
        margin="dense"
      />
      <Alert severity="info">
        card: 4242424242424242 - 08/30 - 123 - 12345
      </Alert>
      <CardElement className="card-element" />
      <Button
        fullWidth
        onClick={handleSubmit}
        variant="contained"
        size="medium"
      >
        {loading ? <CircularProgress color="inherit" /> : 'checkout'}
      </Button>
    </form>
  );
};

const InjectedPaymentForm = () => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <PaymentForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
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
