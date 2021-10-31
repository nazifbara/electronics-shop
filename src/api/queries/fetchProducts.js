import { DataStore } from '@aws-amplify/datastore';

import { Product, Category } from '../../models';
import { getSignedItems } from '../../utils';

const fetchProducts = async ({ categoryID }) => {
  let products = await DataStore.query(Product);
  products = await getSignedItems(products, 'imageKey', 'imageUrl');

  if (categoryID) {
    const category = await DataStore.query(Category, categoryID);
    products = products
      .filter((p) => p.categoryID === categoryID)
      .map((p) => ({ ...p, category }));
  }

  return products;
};

export default fetchProducts;
