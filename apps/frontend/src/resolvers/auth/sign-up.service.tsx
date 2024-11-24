import { useMutation } from '@apollo/client';
import { SIGN_UP } from './auth.graphql';
import { type AuthResponse } from './auth.types';

export interface SignUpPayload {
  phoneNumber: string;
  password: string;
  email?: string;
  username: string;
}

export function useSignUpMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    {
      signUp: AuthResponse;
    },
    { signUpInput: SignUpPayload }
  >(SIGN_UP);

  async function signUp(payload: SignUpPayload) {
    const result = await mutate({
      variables: {
        signUpInput: payload,
      },
    });
    return result;
  }

  return {
    signUp,
    user: data?.signUp.user,
    token: data?.signUp.token,
    loading,
    error,
  };
}
