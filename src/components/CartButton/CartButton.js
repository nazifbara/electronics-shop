import { useState } from 'react';
import {
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
} from '@mui/material';
import { Delete, ShoppingCart } from '@mui/icons-material';

import { useCart } from '../../hooks/useCart';
import { ImageBox } from '../../components';
import { getSignedItems } from '../../utils';

function App() {
  const { cartProducts } = useCart();
  const [state, setState] = useState({
    signedItems: [],
    showCart: false,
    signing: true,
  });

  const toggleCart = (showCart) => () => {
    if (!showCart) {
      setState((s) => ({ ...s, signing: true, showCart }));
    }
    getSignedItems(cartProducts, 'imageKey', 'imageUrl').then((signedItems) => {
      setState((s) => ({ ...s, signing: false, showCart, signedItems }));
    });
  };

  return (
    <>
      <IconButton onClick={toggleCart(true)} color="inherit" size="large">
        <Badge badgeContent={cartProducts.length} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={state.showCart} onClose={toggleCart(false)}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          <ListItem>
            <Typography variant="h4" component="h3">
              Cart
            </Typography>
          </ListItem>

          {state.signing && <CircularProgress />}

          {state.signedItems.map((i) => (
            <ListItem
              key={`cart-item-${i.id}`}
              secondaryAction={
                <IconButton color="error" edge="end" aria-label="delete">
                  <Delete fontSize="medium" />
                </IconButton>
              }
            >
              <ImageBox sx={{ height: 100, width: 100, mr: 2 }}>
                <img src={i.imageUrl} alt={i.name} />
              </ImageBox>
              <ListItemText
                primary={i.name}
                secondary={
                  <TextField
                    value={i.quantity}
                    margin="normal"
                    size="small"
                    label="Qty"
                    type="number"
                    sx={{ width: 80 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default App;
