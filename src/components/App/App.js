import { Switch, Route } from 'react-router-dom';
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  Container,
  IconButton,
  Badge,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import routes from '../../routes';
import { Link } from '../../components';
import { useCart } from '../../hooks/useCart';

function App() {
  const { cartProducts } = useCart();
  return (
    <>
      <Box>
        <AppBar position="static">
          <Container maxWidth="lg">
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                <Link to="/" color="inherit" underline="none">
                  Electronics Shop
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <IconButton color="inherit" size="large">
                  <Badge badgeContent={cartProducts.length} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Container maxWidth="md">
        <Switch>
          {routes.map((view) => (
            <Route {...view.routeProps} exact key={view.name} />
          ))}
        </Switch>
      </Container>
    </>
  );
}

export default App;
