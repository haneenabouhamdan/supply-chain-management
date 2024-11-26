export interface CreateProductInput {
  sku: string;
  name: string;
  description: string;
  price: number;
  threshold: number;
  category: string;
  quantity: number;
}

export interface UpdateProductInput {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  threshold?: number;
  category?: string;
  quantity?: number;
  inventoryId?: string;
}
