import { useMutation } from "@apollo/client";
import { REMOVE_PRODUCT } from "./product.graphql";

export function useRemoveProductMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { removeProduct: boolean },
    { removeProductId: string }
  >(REMOVE_PRODUCT);

  async function removeProduct(productId: string, onCompleted?: () => void) {
    await mutate({
      variables: { removeProductId: productId },
      onCompleted: () => {
        onCompleted?.();
      },
    });
  }

  return {
    removeProduct,
    data,
    loading,
    error,
  };
}
