import { useMutation } from "@apollo/client";
import { Product } from "../order/order.types";
import { UPDATE_PRODUCT } from "./product.graphql";
import { UpdateProductInput } from "./product.types";
import { GET_INVENTORIES } from "../inventory/inventory.graphql";

export function useUpdateProductMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { updateProduct: Product },
    { updateProductId: string; updateProductInput: UpdateProductInput }
  >(UPDATE_PRODUCT);

  async function updateProduct(
    productId: string,
    input: UpdateProductInput,
    onCompleted?: (product: Product) => void
  ) {
    await mutate({
      variables: {
        updateProductId: productId,
        updateProductInput: input,
      },
      onCompleted: (data) => {
        if (data) onCompleted?.(data.updateProduct);
      },
      refetchQueries: [GET_INVENTORIES],
    });
  }

  return {
    updateProduct,
    data,
    loading,
    error,
  };
}
