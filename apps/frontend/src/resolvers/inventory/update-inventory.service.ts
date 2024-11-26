import { useMutation } from "@apollo/client";
import { UPDATE_INVENTORY } from "./inventory.graphql";
import {
  UpdateInventoryResponse,
  UpdateInventoryInput,
} from "./inventory.types";

export function useUpdateInventoryMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { updateInventory: UpdateInventoryResponse },
    { updateInventoryId: string; updateInventoryInput: UpdateInventoryInput }
  >(UPDATE_INVENTORY);

  async function updateInventory(
    id: string,
    input: UpdateInventoryInput,
    onCompleted?: (data: UpdateInventoryResponse) => void
  ) {
    await mutate({
      variables: {
        updateInventoryId: id,
        updateInventoryInput: input,
      },
      onCompleted: (data) => {
        if (data) {
          onCompleted?.(data.updateInventory);
        }
      },
    });
  }

  return {
    updateInventory,
    data,
    loading,
    error,
  };
}
