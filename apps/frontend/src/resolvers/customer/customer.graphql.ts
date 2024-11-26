import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query Customers {
    customers {
      name
      email
      phone
      address
      updatedAt
      id
      deletedAt
      createdAt
    }
  }
`;

export const GET_CUSTOMER = gql`
  query Customer($customerId: String!) {
    customer(id: $customerId) {
      id
      createdAt
      updatedAt
      deletedAt
      name
      email
      phone
      address
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      id
    }
  }
`;
export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($updateCustomerInput: UpdateCustomerInput!) {
    updateCustomer(updateCustomerInput: $updateCustomerInput) {
      id
      createdAt
      updatedAt
      deletedAt
      name
      email
      phone
      address
    }
  }
`;
