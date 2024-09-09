import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (product) => {
    const productId = Number(product.product_id);
    const productInCartIndex = cart.findIndex(
      (item) => Number(item.product_id) === productId
    );

    let updatedCart;

    if (productInCartIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[productInCartIndex].quantity += 1;
    } else {
      updatedCart = [
        ...cart,
        { ...product, product_id: productId, quantity: 1 },
      ];
    }
    updateCart(updatedCart);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter(
      (item) => item.product_id !== product.product_id
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (product) => {
    const productId = Number(product.product_id);
    const productInCartIndex = cart.findIndex(
      (item) => Number(item.product_id) === productId
    );

    if (productInCartIndex !== -1) {
      const updatedCart = [...cart];
      const currentQuantity = updatedCart[productInCartIndex].quantity;

      if (currentQuantity > 1) {
        updatedCart[productInCartIndex].quantity -= 1;
      } else {
        updatedCart.splice(productInCartIndex, 1);
      }
      updateCart(updatedCart);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
