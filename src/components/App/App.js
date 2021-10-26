import { Switch, Route } from 'react-router-dom';
import { Typography, AppBar, Box, Toolbar, Container } from '@mui/material';

import routes from '../../routes';

function App() {
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Electronics Shop
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="md">
        <Switch>
          {routes.map((view) => (
            <Route {...view.routeProps} key={view.name} />
          ))}
        </Switch>
      </Container>
    </>
  );
}

export default App;
