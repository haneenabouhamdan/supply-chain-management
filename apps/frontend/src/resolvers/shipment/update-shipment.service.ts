import { useMutation } from "@apollo/client";
import { CreateShipmentResponse, UpdateShipmentInput } from "./shipment.types";
import { UPDATE_SHIPMENT } from "./shipment.graphql";

export function useUpdateShipment() {
  const [mutate, { data, loading, error }] = useMutation<
    { updateShipment: CreateShipmentResponse },
    { updateShipmentId: string; updateShipmentInput: UpdateShipmentInput }
  >(UPDATE_SHIPMENT);

  async function updateShipment(
    shipmentId: string,
    payload: UpdateShipmentInput
  ) {
    await mutate({
      variables: {
        updateShipmentId: shipmentId,
        updateShipmentInput: payload,
      },
    });
  }

  return {
    updateShipment,
    data,
    loading,
    error,
  };
}
