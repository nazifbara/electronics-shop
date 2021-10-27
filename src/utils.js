import { Storage } from 'aws-amplify';

export const getSignedItems = async (
  items,
  itemKey = 'fileKey',
  resultKey = 'fileUrl'
) => {
  const signedUrls = await Promise.all(
    items.map((item) => {
      console.log(item[itemKey]);
      return Storage.get(item[itemKey]);
    })
  );
  console.log(signedUrls);
  const signedItems = signedUrls.map((url, index) => ({
    ...items[index],
    [resultKey]: url,
  }));

  return signedItems;
};
