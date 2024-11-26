import { useMutation } from "@apollo/client";
import { CREATE_SHIPMENT } from "./shipment.graphql";
import { CreateShipmentResponse, CreateShipmentInput } from "./shipment.types";

export function useCreateShipment() {
  const [mutate, { data, loading, error }] = useMutation<
    { createShipment: CreateShipmentResponse },
    { createShipmentInput: CreateShipmentInput }
  >(CREATE_SHIPMENT);

  async function createShipment(payload: CreateShipmentInput) {
    await mutate({
      variables: { createShipmentInput: payload },
    });
  }

  return {
    createShipment,
    data,
    loading,
    error,
  };
}
