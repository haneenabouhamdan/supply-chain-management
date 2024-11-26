import { useMutation } from "@apollo/client";
import { GET_CUSTOMERS, UPDATE_CUSTOMER } from "./customer.graphql";
import { Customer } from "./customer.types";

interface UpdateCustomerInput {
  id: string; // Required field as per your schema
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface UpdateCustomerProps {
  payload: UpdateCustomerInput;
  onCompleted: (data: { updateCustomer: Customer }) => void;
}

export function useUpdateCustomerMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { updateCustomer: Customer },
    { updateCustomerInput: UpdateCustomerInput }
  >(UPDATE_CUSTOMER);

  async function updateCustomer({ payload, onCompleted }: UpdateCustomerProps) {
    try {
      await mutate({
        variables: { updateCustomerInput: payload },
        onCompleted: (data) => {
          if (data) {
            onCompleted(data);
          }
        },
        // Optimistically update cache to avoid manual refetch
        update: (cache, { data }) => {
          if (data?.updateCustomer) {
            cache.modify({
              fields: {
                customers(existingCustomers = []) {
                  return existingCustomers.map((customer: any) =>
                    customer.id === data.updateCustomer.id
                      ? data.updateCustomer
                      : customer
                  );
                },
              },
            });
          }
        },
      });
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  }

  return {
    updateCustomer,
    data,
    loading,
    error,
  };
}
