import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER, GET_CUSTOMERS } from "./customer.graphql";

interface CreateCustomerInput {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CreateCustomerProps {
  payload: CreateCustomerInput;
  onCompleted: (data: { createCustomer: { id: string } }) => void;
}

export function useCreateCustomerMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { createCustomer: { id: string } },
    { createCustomerInput: CreateCustomerInput }
  >(CREATE_CUSTOMER);

  async function createCustomer({ payload, onCompleted }: CreateCustomerProps) {
    await mutate({
      variables: { createCustomerInput: payload },
      onCompleted: (data) => {
        if (data) {
          onCompleted(data);
        }
      },
      refetchQueries: [GET_CUSTOMERS],
    });
  }

  return {
    createCustomer,
    data,
    loading,
    error,
  };
}
