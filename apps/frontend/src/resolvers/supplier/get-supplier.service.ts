import { useQuery } from "@apollo/client";
import { GET_SUPPLIER } from "./supplier.graphql";
import { SupplierResponse } from "./supplier.types";

export function useGetSupplier(supplierId: string) {
  const { data, loading, error, refetch } = useQuery<
    { supplier: SupplierResponse },
    { supplierId: string }
  >(GET_SUPPLIER, {
    variables: { supplierId },
  });

  return {
    supplier: data?.supplier,
    loading,
    error,
    refetch,
  };
}
