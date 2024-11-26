import { useMutation } from "@apollo/client";
import { CREATE_SUPPLIER } from "./supplier.graphql";
import { CreateSupplierInput, SupplierResponse } from "./supplier.types";

export function useCreateSupplier() {
  const [mutate, { data, loading, error }] = useMutation<
    { createSupplier: SupplierResponse },
    { createSupplierInput: CreateSupplierInput }
  >(CREATE_SUPPLIER);

  async function createSupplier(payload: CreateSupplierInput) {
    await mutate({
      variables: { createSupplierInput: payload },
    });
  }

  return {
    createSupplier,
    data,
    loading,
    error,
  };
}
