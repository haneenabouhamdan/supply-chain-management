import { useMutation } from "@apollo/client";
import { UPDATE_SUPPLIER } from "./supplier.graphql";
import { SupplierResponse, UpdateSupplierInput } from "./supplier.types";

export function useUpdateSupplier() {
  const [mutate, { data, loading, error }] = useMutation<
    { updateSupplier: SupplierResponse },
    { updateSupplierInput: UpdateSupplierInput }
  >(UPDATE_SUPPLIER);

  async function updateSupplier(payload: UpdateSupplierInput) {
    await mutate({
      variables: { updateSupplierInput: payload },
    });
  }

  return {
    updateSupplier,
    data,
    loading,
    error,
  };
}
