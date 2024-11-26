import { useQuery } from "@apollo/client";
import { Order } from "./order.types";
import { GET_ORDERS } from "./orders.graphql";

interface OrdersResponse {
  orders: Order[];
}

export function useOrders() {
  const { data, loading, error } = useQuery<OrdersResponse>(GET_ORDERS);

  return {
    data: data?.orders || [],
    loading,
    error,
  };
}
