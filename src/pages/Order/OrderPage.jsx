import React from "react";
import OrderSucess from "./components/OrderSucess";
import OrderFail from "./components/OrderFail";
import useTitle from "../../hooks/useTitle";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const { state } = useLocation();
  useTitle("Order Summary");
  return (
    <main>
      {state.status ? <OrderSucess data={state.data} /> : <OrderFail />}
    </main>
  );
};

export default OrderPage;
