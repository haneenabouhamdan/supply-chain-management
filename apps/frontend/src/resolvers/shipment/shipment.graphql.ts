import { gql } from "@apollo/client";

export const GET_SHIPMENT = gql`
  query Shipments {
    shipments {
      status
      trackingNumber
      startTime
      endTime
      driverId
      driver {
        id
        createdAt
        updatedAt
        deletedAt
        username
        email
        phoneNumber
        status
        dateOfBirth
        profilePicture
      }
    }
  }
`;

export const GET_SHIPMENTS = gql`
  query Shipments {
    shipments {
      status
      trackingNumber
      startTime
      endTime
      driverId
      driver {
        id
        createdAt
        updatedAt
        deletedAt
        username
        email
        phoneNumber
        status
        dateOfBirth
        profilePicture
        supplierId
      }
    }
  }
`;

export const CREATE_SHIPMENT = gql`
  mutation CreateShipment($createShipmentInput: CreateShipmentInput!) {
    createShipment(createShipmentInput: $createShipmentInput) {
      status
      trackingNumber
      startTime
      endTime
      driverId
      driver {
        id
        createdAt
        updatedAt
        deletedAt
        username
        email
        phoneNumber
        status
        dateOfBirth
        profilePicture
      }
    }
  }
`;

export const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment(
    $updateShipmentId: String!
    $updateShipmentInput: UpdateShipmentInput!
  ) {
    updateShipment(
      id: $updateShipmentId
      updateShipmentInput: $updateShipmentInput
    ) {
      status
      trackingNumber
      startTime
      endTime
      driverId
      driver {
        id
        createdAt
        updatedAt
        deletedAt
        username
        email
        phoneNumber
        status
        dateOfBirth
        profilePicture
      }
    }
  }
`;

export const REMOVE_SHIPMENT = gql`
  mutation RemoveShipment($removeShipmentId: String!) {
    removeShipment(id: $removeShipmentId)
  }
`;
