import axios from "axios";
import Customers from "./customers";
import Orders from "./orders";
import Products from "./products";
import Transactions from "./transactions";

export const api = () => {
  const axiosConfig = axios.create({
    baseURL: import.meta.env.VITE_API_URL_DEV,
    headers: {
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    timeout: 45000,
  });

  const customers = Customers(axiosConfig);
  const orders = Orders(axiosConfig);
  const products = Products(axiosConfig);
  const transactions = Transactions(axiosConfig);

  return {
    customers,
    orders,
    products,
    transactions
  };
};
