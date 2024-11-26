import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "./product.graphql";
import { Product } from "../order/order.types";

export function useGetProduct(productId: string) {
  const { data, loading, error } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { productId },
  });

  return {
    product: data?.product,
    loading,
    error,
  };
}
