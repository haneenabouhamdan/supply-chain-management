import { useQuery } from "@apollo/client";
import { GET_SHIPMENT } from "./shipment.graphql";
import { Shipment } from "./shipment.types";

interface GetShipmentResponse {
  shipment: Shipment;
}

export function useGetShipment(shipmentId: string) {
  const { data, loading, error } = useQuery<GetShipmentResponse>(GET_SHIPMENT, {
    variables: { shipmentId },
  });

  return {
    shipment: data?.shipment,
    loading,
    error,
  };
}
