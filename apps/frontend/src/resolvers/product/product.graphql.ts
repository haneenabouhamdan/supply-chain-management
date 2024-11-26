import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      sku
      id
      name
      description
      price
      threshold
      category
      quantity
      inventoryId
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Products {
    products {
      sku
      id
      name
      description
      price
      threshold
      category
      quantity
      inventoryId
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
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
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $updateProductId: String!
    $updateProductInput: UpdateProductInput!
  ) {
    updateProduct(
      id: $updateProductId
      updateProductInput: $updateProductInput
    ) {
      id
      createdAt
      updatedAt
      deletedAt
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
`;

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($removeProductId: String!) {
    removeProduct(id: $removeProductId)
  }
`;

export const ADJUST_STOCK = gql`
  mutation AdjustStock($productId: String!, $adjustmentQuantity: Float!) {
    adjustStock(
      productId: $productId
      adjustmentQuantity: $adjustmentQuantity
    ) {
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
  }
`;
