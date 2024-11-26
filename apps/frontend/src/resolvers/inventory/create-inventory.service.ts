import { useMutation } from "@apollo/client";
import {
  CreateInventoryResponse,
  CreateInventoryInput,
  CREATE_INVENTORY,
} from "./inventory.graphql";

export function useCreateInventoryMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { createInventory: CreateInventoryResponse },
    { createInventoryInput: CreateInventoryInput }
  >(CREATE_INVENTORY);

  async function createInventory(
    input: CreateInventoryInput,
    onCompleted?: (data: CreateInventoryResponse) => void
  ) {
    await mutate({
      variables: { createInventoryInput: input },
      onCompleted: (data) => {
        if (data) {
          onCompleted?.(data.createInventory);
        }
      },
    });
  }

  return {
    createInventory,
    data,
    loading,
    error,
  };
}
