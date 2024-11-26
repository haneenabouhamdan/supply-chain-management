import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query Orders {
    orders {
      id
      updatedAt
      createdAt
      deletedAt
      reference
      customerId
      customer {
        name
        phone
      }
      status
      paymentType
      reference
      paymentAmount
      supplierId
      supplier {
        name
        email
        phone
        address
      }
      estimatedDeliveryDate
      actualDeliveryDate
      shipmentId
      items {
        orderId
        product {
          sku
          name
          description
          price
          threshold
          category
        }
        productId
        quantity
      }
    }
  }
`;

export const GET_ORDER = gql`
  query Order($orderId: String!) {
    order(id: $orderId) {
      id
      updatedAt
      createdAt
      deletedAt
      reference
      customerId
      customer {
        name
        phone
      }
      status
      paymentType
      supplier {
        name
        email
        phone
        address
      }
      reference
      paymentAmount
      supplierId
      estimatedDeliveryDate
      actualDeliveryDate
      shipmentId
      items {
        orderId
        product {
          sku
          name
          description
          price
          threshold
          category
        }
        productId
        quantity
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $updateOrderId: String!
    $updateOrderInput: UpdateOrderInput!
  ) {
    updateOrder(id: $updateOrderId, updateOrderInput: $updateOrderInput) {
      id
      updatedAt
      createdAt
      deletedAt
      reference
      customerId
      status
      paymentType
      customer {
        name
        phone
      }
      paymentAmount
      supplierId
      estimatedDeliveryDate
      actualDeliveryDate
      shipmentId
      supplier {
        name
        email
        phone
        address
      }
      items {
        orderId
        product {
          sku
          name
          description
          price
          threshold
          category
        }
        productId
        quantity
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      id
      supplier {
        name
        email
        phone
        address
      }
      items {
        orderId
        productId
        quantity
        product {
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
  }
`;
