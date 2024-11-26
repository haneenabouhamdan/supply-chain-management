import { useQuery } from "@apollo/client";
import { GET_SHIPMENTS } from "./shipment.graphql";
import { Shipment } from "./shipment.types";

interface GetShipmentsResponse {
  shipments: Shipment[];
}

export function useGetShipments() {
  const { data, loading, error } =
    useQuery<GetShipmentsResponse>(GET_SHIPMENTS);

  return {
    shipments: data?.shipments || [],
    loading,
    error,
  };
}
