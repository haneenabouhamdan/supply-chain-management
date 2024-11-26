import { useQuery } from "@apollo/client";
import { GET_INVENTORIES } from "./inventory.graphql";
import { Inventory, InventoryFilters } from "./inventory.types";

export function useGetInventories(filters?: InventoryFilters) {
  const { data, loading, error } = useQuery<{ inventories: Inventory[] }>(
    GET_INVENTORIES,
    {
      variables: { filters: filters || {} }, // Ensure filters is always defined
    }
  );

  return {
    inventories: data?.inventories || [],
    loading,
    error,
  };
}
