import { Route, Routes } from "react-router-dom";
import React from "react";
import {
  HomePage,
  ProductList,
  ProductDetail,
  Register,
  Login,
  CartPage,
  OrderPage,
  DashboardPage,
  PageNotFound,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";

// import HomePage from "../pages/Home/HomePage";
// import ProductsList from "../pages/Products/ProductsList";
// import ProductDetail from "../pages/ProductDetail";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-summary"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
