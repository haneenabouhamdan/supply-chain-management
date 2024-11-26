import { useMutation } from "@apollo/client";
import { UpdateOrderInput, UpdateOrderResponse } from "./order.types";
import { GET_ORDERS, UPDATE_ORDER } from "./orders.graphql";

export function useUpdateOrderMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    UpdateOrderResponse,
    { updateOrderId: string; updateOrderInput: UpdateOrderInput }
  >(UPDATE_ORDER);

  async function updateOrder(
    orderId: string,
    updateOrderInput: UpdateOrderInput
  ) {
    await mutate({
      variables: {
        updateOrderId: orderId,
        updateOrderInput,
      },
      refetchQueries: [GET_ORDERS],
    });
  }

  return {
    updateOrder,
    isOrderUpdated: Boolean(data?.updateOrder) && !error,
    updating: loading,
    error,
  };
}
