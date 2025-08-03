import { filterReducer } from "../reducers";
import { createContext, useContext, useReducer, useCallback } from "react";
//const { createContext, useContext, useReducer, useCallback } = require("react");

const filterInitialState = {
  productList: [],
  onlyInStock: false,
  bestSellerOnly: false,
  sortBy: null,
  retings: null,
}; //original state
//task of dispatch is to update onlyInStock,bestSellerOnly,sortBy and retings

const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);

  // function initialProductList(products) {
  //   dispatch({
  //     type: "PRODUCT_LIST",
  //     payload: {
  //       products: products,
  //     },
  //   });
  // }
  const initialProductList = useCallback(
    (products) => {
      dispatch({
        type: "PRODUCT_LIST",
        payload: {
          products: products,
        },
      });
    },
    [dispatch]
  );

  function bestSeller(products) {
    return state.bestSellerOnly
      ? products.filter((product) => product.best_seller === true)
      : products;
  }

  function inStock(products) {
    return state.onlyInStock
      ? products.filter((product) => product.in_stock === true)
      : products;
  }

  function sort(products) {
    if (state.sortBy === "lowtohigh") {
      return products.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (state.sortBy === "hightolow") {
      return products.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return products;
  }

  function rating(products) {
    if (state.retings === "4STARSABOVE") {
      return products.filter((product) => product.rating >= 4);
    }
    if (state.retings === "3STARSABOVE") {
      return products.filter((product) => product.rating >= 3);
    }
    if (state.retings === "2STARSABOVE") {
      return products.filter((product) => product.rating >= 2);
    }
    if (state.retings === "1STARABOVE") {
      return products.filter((product) => product.rating >= 1);
    }
    return products;
  }

  const filterProductList = rating(
    sort(inStock(bestSeller(state.productList)))
  );

  const value = {
    state,
    dispatch,
    //products: state.productList,
    products: filterProductList,
    initialProductList,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  return context;
};
