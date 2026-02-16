import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { CartContext } from "./CartContext";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === pizza.id);
      if (found) {
        return prev.map((item) =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prev, { ...pizza, count: 1 }];
    });
  };

  const increment = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.count, 0),
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, increment, decrement, total }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
