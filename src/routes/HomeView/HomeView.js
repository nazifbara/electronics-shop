import { Typography } from '@mui/material';

const HomeView = () => {
  return (
    <Typography variant="h1" component="h1">
      Electronics Shop
    </Typography>
  );
};

const view = {
  routeProps: {
    path: '/',
    component: HomeView,
  },
  name: 'HomeView',
};

export default view;
