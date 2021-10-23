import { Typography } from '@mui/material';

const HomeView = () => {
  return (
    <Typography variant="h3" noWrap component="h3">
      Home View
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
