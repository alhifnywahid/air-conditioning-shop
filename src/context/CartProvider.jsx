import { createContext, useEffect, useState } from "react";
import { getUser } from "../service/getUser.service";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [change, setChange] = useState(true);
  const [load, setLoad] = useState(true);
  const [user, setUser] = useState({});
  const [updateUser, setUpdateUser] = useState(false);

  useEffect(() => {
    setLoad(true);
    getUser(localStorage.getItem("token")).then((user) => {
      setCart(user.cart);
    });
  }, [change]);

  useEffect(() => {
    getUser(localStorage.getItem("token")).then((user) => {
      setUser(user);
    });
  }, [updateUser]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        setChange,
        load,
        setLoad,
        user,
        setUser,
        setUpdateUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
