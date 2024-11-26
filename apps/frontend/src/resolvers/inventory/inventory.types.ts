import { Product } from "../order/order.types";

export interface Inventory {
  id: string;
  location: string;
  supplierId: string;
  products: Product[];
  supplier: {
    name: string;
  };
}
export interface UpdateInventoryInput {
  location?: string;
  quantity?: number;
  supplierId?: string;
}

export interface UpdateInventoryResponse {
  location: string;
  supplierId: string;
}

export interface InventoryFilters {
  location?: string;
  lowStock?: boolean;
  category?: string;
  supplier?: string;
}
