import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      token
      user {
        email
        dateOfBirth
        status
        username
        profilePicture
        phoneNumber
        id
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($signUpInput: CreateUserDto!) {
    signUp(signUpInput: $signUpInput) {
      result
      token
      user {
        id
      }
    }
  }
`;
export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      id
      username
      email
      phoneNumber
      status
      dateOfBirth
      profilePicture
    }
  }
`;
export const HASH_PASSWORD = gql`
  mutation HashPassword($password: String!) {
    hashPassword(password: $password)
  }
`;
