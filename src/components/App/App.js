import { Switch, Route } from 'react-router-dom';
import { Typography, AppBar, Box, Toolbar, Container } from '@mui/material';

import routes from '../../routes';
import { Link, CartButton, LoginButton } from '../../components';

function App() {
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
              <LoginButton>login</LoginButton>
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
