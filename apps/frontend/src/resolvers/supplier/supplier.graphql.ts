import { gql } from "@apollo/client";

export const GET_SUPPLIER = gql`
  query Supplier($supplierId: String!) {
    supplier(id: $supplierId) {
      name
      email
      phone
      address
    }
  }
`;

export const CREATE_SUPPLIER = gql`
  mutation CreateSupplier($createSupplierInput: CreateSupplierInput!) {
    createSupplier(createSupplierInput: $createSupplierInput) {
      address
      email
      name
      phone
    }
  }
`;
export const UPDATE_SUPPLIER = gql`
  mutation UpdateSupplier($updateSupplierInput: UpdateSupplierInput!) {
    updateSupplier(updateSupplierInput: $updateSupplierInput) {
      name
      email
      phone
      address
    }
  }
`;

export const GET_SUPPLIERS = gql`
  query Suppliers {
    suppliers {
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
