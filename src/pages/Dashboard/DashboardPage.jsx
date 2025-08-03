import React, { useEffect, useState } from "react";
import DashboardEmpty from "./components/DashboardEmpty";
import DashboardCard from "./components/DashboardCard";
import { getUserOrders } from "../../services";
import useTitle from "../../hooks/useTitle";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [order, setOrder] = useState([]);
  useTitle("Dahboard");
  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getUserOrders();
        setOrder(data);
      } catch (error) {
        toast(error.message, {
          closeButton: true,
          position: "bottom-center",
        });
      }
    }
    fetchOrders();
  }, []);
  //const order = [];
  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          My Dashboard
        </p>
      </section>

      <section>
        {order.length &&
          order.map((order) => <DashboardCard key={order.id} order={order} />)}
      </section>

      <section>{!order.length && <DashboardEmpty />}</section>
    </main>
  );
};

export default DashboardPage;
