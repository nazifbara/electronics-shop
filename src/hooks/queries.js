import { useQuery } from 'react-query';

import { fetchCategories, fetchProducts } from '../api/queries';
import { getSignedItems } from '../utils';

export const useCategories = () =>
  useQuery('categories', async () => {
    const unsignedCategories = await fetchCategories();
    const signedCategories = await getSignedItems(
      unsignedCategories,
      'imageKey',
      'imageUrl'
    );

    return signedCategories;
  });

export const useProducts = (criteria) =>
  useQuery(
    'products' + (criteria ? JSON.stringify(criteria) : ''),
    async () => await fetchProducts(criteria)
  );
