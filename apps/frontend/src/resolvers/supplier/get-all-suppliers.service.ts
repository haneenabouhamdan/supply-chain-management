import { useQuery } from "@apollo/client";
import { GET_SUPPLIERS } from "./supplier.graphql";
import { SupplierResponse } from "./supplier.types";

/**
 * Custom hook to fetch a list of suppliers
 */
export function useGetSuppliers() {
  const { data, loading, error, refetch } = useQuery<{
    suppliers: SupplierResponse[];
  }>(GET_SUPPLIERS);

  return {
    suppliers: data?.suppliers || [],
    loading,
    error,
    refetch,
  };
}
