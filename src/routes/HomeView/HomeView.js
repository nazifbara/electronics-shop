import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
} from '@mui/material';

import { useCategories } from '../../hooks/queries';

import { ContentBox, Link } from '../../components';

const HomeView = () => {
  const { isSuccess, isLoading, isError, data: categories } = useCategories();

  return (
    <ContentBox>
      <Typography variant="h4" component="h3">
        Shop By Catagory
      </Typography>
      <ContentBox>
        {isError && (
          <Alert severity="error">
            <Typography variant="body1" component="span">
              Something went wrong. Please refresh the page and try again
            </Typography>
          </Alert>
        )}

        {isLoading && <CircularProgress />}

        <Grid container spacing={2}>
          {isSuccess &&
            categories.map((category) => (
              <Grid key={category.name} item xs={6} sm={4} md={3}>
                <CardActionArea>
                  <Link to={`/category/${category.slug}/${category.id}`}>
                    <Card>
                      <CardMedia
                        component="img"
                        image={category.imageUrl}
                        alt={category.name}
                      />
                      <CardContent>
                        <Typography variant="body1" component="p">
                          {category.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </CardActionArea>
              </Grid>
            ))}
        </Grid>
      </ContentBox>
    </ContentBox>
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
