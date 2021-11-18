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
import { Delete, ShoppingCart, Close } from '@mui/icons-material';

import { useCart } from '../../hooks/useCart';
import { ImageBox } from '../../components';
import { formatPrice } from '../../utils';
import { Box } from '@mui/system';

function App() {
  const {
    cartProducts,
    handleQtyChange,
    refreshImagesUrls,
    removeFromCart,
    getTotal,
  } = useCart();
  const [state, setState] = useState({
    showCart: false,
    signing: true,
  });

  const toggleCart = (showCart) => () => {
    if (!showCart) {
      setState((s) => ({ ...s, signing: true, showCart }));
    }
    refreshImagesUrls().then(() => {
      setState((s) => ({ ...s, signing: false, showCart }));
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
            <Typography gutterBottom variant="h4" component="h3">
              <IconButton onClick={toggleCart(false)} size="medium">
                <Close fontSize="medium" />
              </IconButton>
              Your Cart
            </Typography>
          </ListItem>

          {state.signing && <CircularProgress />}

          {cartProducts.map((p) => (
            <ListItem
              key={`cart-item-${p.id}`}
              secondaryAction={
                <IconButton
                  color="error"
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeFromCart(p)}
                >
                  <Delete fontSize="medium" />
                </IconButton>
              }
            >
              <ImageBox sx={{ height: 100, width: 100, mr: 2 }}>
                <img src={p.imageUrl} alt={p.name} />
              </ImageBox>
              <ListItemText
                primary={p.name}
                secondary={
                  <TextField
                    onChange={handleQtyChange(p)}
                    value={p.quantity}
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
          <ListItem>
            <Typography variant="h4" component="span">
              Total
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h4" component="span">
              {formatPrice(getTotal())}
            </Typography>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default App;
