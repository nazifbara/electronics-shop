import { Storage } from 'aws-amplify';
import Dinero from 'dinero.js';

export const validateFormSubmit = (formData) => {
  const keys = Object.keys(formData);
  const error = {};

  keys.forEach((key) => {
    switch (key) {
      case 'code':
        if (isNaN(Number(formData[key])) || formData[key].length !== 6) {
          error[key] = 'confirmation must be a 6-digit number';
        }
        break;
      case 'email':
        const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!formData[key].match(mailFormat)) {
          error[key] = 'invalid email address';
        }
        break;
      case 'name':
        if (formData[key].length < 3) {
          error[key] = 'name must contain at least 3 characters';
        }
        break;
      case 'password':
        if (formData[key].length < 8) {
          error[key] = 'password must be at least 8 characters long';
        }
        break;
      default:
        break;
    }
  });

  return Object.keys(error).length === 0 ? null : error;
};

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
