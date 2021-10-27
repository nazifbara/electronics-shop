import { Storage } from 'aws-amplify';

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
