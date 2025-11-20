// src/context/CartContext.jsx
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Eliminar un producto específico (usamos filter)
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  // Vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcular total automáticamente
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  // Cantidad de items
  const quantity = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, quantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);