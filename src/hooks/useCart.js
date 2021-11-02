import { createContext, useContext, useState, useEffect } from 'react';

import { getSignedItems } from '../utils';

const CartContext = createContext();

export const CartProvider = (props) => {
  const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
  const [cartProducts, setCartProducts] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const refreshImagesUrls = async () =>
    await getSignedItems(cartProducts, 'imageKey', 'imageUrl');

  const handleQtyChange = (product) => (e) => {
    const quantity = Number(e.target.value);

    if (quantity < 1) {
      return;
    }

    const productIndex = findProductIndex(product);
    setCartProducts((s) => [
      ...s.slice(0, productIndex),
      { ...product, quantity },
      ...s.slice(productIndex + 1),
    ]);
  };

  const addToCart = (product, quantity) => {
    setCartProducts((s) => [...s, { ...product, quantity }]);
  };

  const removeFromCart = (product) => {
    const productIndex = findProductIndex(product);
    setCartProducts((s) => [
      ...s.slice(0, productIndex),
      ...s.slice(productIndex + 1),
    ]);
  };

  const isInCart = (product) => Boolean(findProduct(product));

  const findProduct = (product) =>
    cartProducts.find((p) => p.id === product.id);

  const findProductIndex = (product) =>
    cartProducts.findIndex((p) => p.id === product.id);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        isInCart,
        cartProducts,
        handleQtyChange,
        refreshImagesUrls,
      }}
      {...props}
    />
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
