import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserDto: UpdateUserDto!) {
    updateUser(UpdateUserDto: $updateUserDto) {
      status
      id
    }
  }
`;

export const SAVE_TOKEN = gql`
  mutation SaveToken($userId: UUID!, $token: String!) {
    saveToken(userId: $userId, token: $token) {
      message
    }
  }
`;

export const GET_USER = gql`
  query User($userId: UUID!) {
    user(id: $userId) {
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
`;
