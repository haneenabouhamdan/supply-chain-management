import { useQuery } from "@apollo/client";
import { Order } from "./order.types";
import { GET_ORDER } from "./orders.graphql";

interface OrdersDetailsDto {
  order: Order;
}

export function useOrderDetails(orderId: string) {
  const { data, loading, error, refetch } = useQuery<{
    order: OrdersDetailsDto;
  }>(GET_ORDER, {
    variables: { orderId },
  });

  return {
    data: data?.order,
    loading,
    error,
    refetch,
  };
}
