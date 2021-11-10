import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Hub, Auth } from 'aws-amplify';

import routes from '../../routes';
import { Link, CartButton, LoginButton } from '../../components';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          setIsAuthenticated(true);
          break;
        case 'signOut':
          setIsAuthenticated(false);
          break;
        default:
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));

    return () => Hub.remove('auth');
  });

  const logout = async () => {
    await Auth.signOut();
  };

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
              {isAuthenticated ? (
                <Button
                  size="medium"
                  startIcon={<Logout />}
                  color="inherit"
                  onClick={logout}
                >
                  Logout
                </Button>
              ) : (
                <LoginButton>login</LoginButton>
              )}
              <Box>
                <CartButton />
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
