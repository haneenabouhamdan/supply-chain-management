import { useMutation } from "@apollo/client";
import { CreateProductInput } from "./product.types";
import { Product } from "../order/order.types";
import { CREATE_PRODUCT, GET_PRODUCTS } from "./product.graphql";
import { GET_INVENTORIES } from "../inventory/inventory.graphql";

export function useCreateProductMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { createProduct: Product },
    { createProductInput: CreateProductInput }
  >(CREATE_PRODUCT);

  async function createProduct(
    input: CreateProductInput,
    onCompleted?: (product: Product) => void
  ) {
    await mutate({
      variables: { createProductInput: input },
      onCompleted: (data) => {
        if (data) onCompleted?.(data.createProduct);
      },
      refetchQueries: [GET_INVENTORIES, GET_PRODUCTS],
    });
  }

  return {
    createProduct,
    data,
    loading,
    error,
  };
}
