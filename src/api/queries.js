import { DataStore } from '@aws-amplify/datastore';

import { Product, Category } from '../models';
import { getSignedItems } from '../utils';

export const fetchCategories = async () => await DataStore.query(Category);

export const fetchProduct = async (id) => {
  let product = await DataStore.query(Product, id);
  return (await getSignedItems([product], 'imageKey', 'imageUrl'))[0];
};

export const fetchProducts = async ({ categoryID }) => {
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

export default fetchCategories;
