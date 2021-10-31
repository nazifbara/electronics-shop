import { useQuery } from 'react-query';

import { fetchCategories } from '../../api/queries';
import { getSignedItems } from '../../utils';

const useCategories = () =>
  useQuery('categories', async () => {
    const unsignedCategories = await fetchCategories();
    const signedCategories = await getSignedItems(
      unsignedCategories,
      'imageKey',
      'imageUrl'
    );

    return signedCategories;
  });

export default useCategories;
