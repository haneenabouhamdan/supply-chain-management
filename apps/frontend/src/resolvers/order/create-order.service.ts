import { useMutation } from "@apollo/client";
import { CREATE_ORDER, GET_ORDERS } from "./orders.graphql";

interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

interface CreateOrderInput {
  customerId: string;
  estimatedDeliveryDate?: string;
  items: CreateOrderItemInput[];
  paymentAmount: number;
  paymentType: string; // Replace with PaymentStatus enum if applicable
  reference?: string;
  shipmentId?: string;
  status?: string; // Replace with OrderStatus enum if applicable
  supplierId: string;
}

interface CreateOrderResponse {
  id: string;
  items: {
    orderId: string;
    productId: string;
    quantity: number;
    product: {
      sku: string;
      name: string;
      description?: string;
      price: number;
      threshold: number;
      category: string;
      quantity: number;
      inventoryId: string;
    };
  }[];
}

interface CreateOrderProps {
  payload: CreateOrderInput;
  onCompleted?: (data: CreateOrderResponse) => void;
  onError?: (error: Error) => void;
}

export function useCreateOrderMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { createOrder: CreateOrderResponse },
    { createOrderInput: CreateOrderInput }
  >(CREATE_ORDER);

  async function createOrder({
    payload,
    onCompleted,
    onError,
  }: CreateOrderProps) {
    try {
      await mutate({
        variables: { createOrderInput: payload },
        onCompleted: (data) => {
          if (data) {
            onCompleted?.(data.createOrder);
          }
        },
        refetchQueries: [GET_ORDERS],
      });
    } catch (err) {
      console.error("Error creating order:", err);
      onError?.(err as Error);
    }
  }

  return {
    createOrder,
    data,
    loading,
    error,
  };
}
