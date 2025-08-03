import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducers";
//import { type } from "@testing-library/user-event/dist/type";

const cartInitialState = {
  cartList: [],
  total: 0,
};

const cartcontext = createContext(cartInitialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  function addToCart(product) {
    const updatedList = state.cartList.concat(product);
    const updatedTotal = state.total + product.price;

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedList,
        total: updatedTotal,
      },
    });
  }

  function removeFromCart(product) {
    const updatedList = state.cartList.filter((item) => item.id !== product.id);
    const updatedTotal = state.total - product.price;

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedList,
        total: updatedTotal,
      },
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
      payload: {
        products: [],
        total: 0,
      },
    });
  }

  const value = {
    cartList: state.cartList,
    total: state.total,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <cartcontext.Provider value={value}>{children}</cartcontext.Provider>;
};

export const useCart = () => {
  const context = useContext(cartcontext);
  return context;
};
