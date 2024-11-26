import { useQuery } from "@apollo/client";
import { GET_CUSTOMER } from "./customer.graphql";
import { Customer } from "./customer.types";

interface GetCustomerProps {
  customerId: string;
}

export function useGetCustomerQuery({ customerId }: GetCustomerProps) {
  const { data, loading, error, refetch } = useQuery<{ customer: Customer }>(
    GET_CUSTOMER,
    {
      variables: { customerId },
      skip: !customerId, // Avoid query execution if no ID is provided
    }
  );

  return {
    customer: data?.customer,
    loading,
    error,
    refetch,
  };
}
