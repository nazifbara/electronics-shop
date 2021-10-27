import { Typography } from '@mui/material';
import { useParams } from 'react-router';

import { ContentBox } from '../../components';

const CategoryView = () => {
  const { slug, categoryId } = useParams();

  return (
    <ContentBox>
      <Typography variant="h4" component="h3">
        {slug} - {categoryId}
      </Typography>
    </ContentBox>
  );
};

const view = {
  routeProps: {
    path: '/category/:slug/:categoryId',
    component: CategoryView,
  },
  name: 'CategoryView',
};

export default view;
