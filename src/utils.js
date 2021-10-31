import { Storage } from 'aws-amplify';
import Dinero from 'dinero.js';

export const getSignedItems = async (
  items,
  itemKey = 'fileKey',
  resultKey = 'fileUrl'
) => {
  const signedUrls = await Promise.all(
    items.map((item) => Storage.get(item[itemKey]))
  );
  const signedItems = signedUrls.map((url, index) => ({
    ...items[index],
    [resultKey]: url,
  }));

  return signedItems;
};

export const formatPrice = (price) => {
  const p = Dinero({ amount: price });

  if (p.hasSubUnits()) {
    return p.toFormat('$0,0.00');
  }

  return Dinero({ amount: price }).toFormat('$0,0');
};
