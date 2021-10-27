import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material';

import { useCategories } from '../../hooks/queries';

import ContentBox from '../../components/ContentBox';

const HomeView = () => {
  const { isSuccess, data: categories } = useCategories();

  console.log(categories);

  return (
    <ContentBox>
      <Typography variant="h4" component="h3">
        Shop By Catagory
      </Typography>
      <ContentBox sx={{ pt: 4, pb: 4 }}>
        <Grid container spacing={2}>
          {isSuccess &&
            categories.map((category) => (
              <Grid key={category.name} item xs={6} sm={4} md={3}>
                <CardActionArea>
                  <a href="/#">
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
                  </a>
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
