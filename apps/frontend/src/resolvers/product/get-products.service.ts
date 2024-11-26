import { useQuery } from "@apollo/client";
import { Product } from "../order/order.types";
import { GET_PRODUCTS } from "./product.graphql";

export function useGetProducts() {
  const { data, loading, error } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS
  );

  return {
    products: data?.products || [],
    loading,
    error,
  };
}
