import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = (props) => {
  const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
  const [cartProducts, setCartProducts] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addToCart = (product, quantity) => {
    setCartProducts((s) => [...s, { ...product, quantity }]);
  };

  const removeFromCart = (product) => {
    const productIndex = cartProducts.findIndex((p) => p.id === product.id);
    setCartProducts((s) => [
      ...s.slice(0, productIndex),
      ...s.slice(productIndex + 1),
    ]);
  };

  const isInCart = (product) => Boolean(findProduct(product));

  const findProduct = (product) =>
    cartProducts.find((p) => p.id === product.id);

  return (
    <CartContext.Provider
      value={{ addToCart, removeFromCart, isInCart, cartProducts }}
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
