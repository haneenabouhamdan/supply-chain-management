import { gql } from "@apollo/client";

export const GET_INVENTORIES = gql`
  query Inventories($filters: InventoryFilterArgs) {
    inventories(filters: $filters) {
      location
      supplierId
      products {
        id
        sku
        name
        description
        price
        threshold
        category
        quantity
        inventoryId
      }
      supplier {
        name
        email
        phone
        address
      }
    }
  }
`;

export const CREATE_INVENTORY = gql`
  mutation CreateInventory($createInventoryInput: CreateInventoryInput!) {
    createInventory(createInventoryInput: $createInventoryInput) {
      location
      quantity
      supplierId
      products {
        sku
        name
        description
        price
        threshold
        category
        quantity
        inventoryId
      }
    }
  }
`;

export const UPDATE_INVENTORY = gql`
  mutation UpdateInventory(
    $updateInventoryId: String!
    $updateInventoryInput: UpdateInventoryInput!
  ) {
    updateInventory(
      id: $updateInventoryId
      updateInventoryInput: $updateInventoryInput
    ) {
      location
      quantity
      supplierId
      supplier {
        name
        email
        phone
        address
      }
    }
  }
`;

export interface CreateInventoryInput {
  location: string;
  quantity: number;
  supplierId: string;
  products: {
    sku: string;
    name: string;
    description: string;
    price: number;
    threshold: number;
    category: string;
    quantity: number;
  }[];
}

export interface CreateInventoryResponse {
  location: string;
  quantity: number;
  supplierId: string;
  products: {
    sku: string;
    name: string;
    description: string;
    price: number;
    threshold: number;
    category: string;
    quantity: number;
    inventoryId: string;
  }[];
}
