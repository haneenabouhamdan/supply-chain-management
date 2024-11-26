import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "./customer.graphql";
import { Customer } from "./customer.types";

export function useGetCustomersQuery() {
  const { data, loading, error, refetch } = useQuery<{ customers: Customer[] }>(
    GET_CUSTOMERS
  );

  return {
    customers: data?.customers || [],
    loading,
    error,
    refetch,
  };
}
