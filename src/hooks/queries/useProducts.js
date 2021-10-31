import { useQuery } from 'react-query';

import { fetchProducts } from '../../api/queries';

const useProducts = (criteria) =>
  useQuery(
    'products' + (criteria ? JSON.stringify(criteria) : ''),
    async () => await fetchProducts(criteria)
  );

export default useProducts;
