import { useMutation } from '@apollo/client';
import { SIGN_IN } from './auth.graphql';
import { type AuthResponse } from './auth.types';

export interface SignInPayload {
  identifier: string;
  password: string;
}

export function useSignInMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    {
      signIn: AuthResponse;
    },
    { signInInput: SignInPayload }
  >(SIGN_IN);

  async function signIn(payload: SignInPayload) {
    const result = await mutate({
      variables: {
        signInInput: payload,
      },
    });
    return result;
  }

  return {
    signIn,
    user: data?.signIn.user,
    token: data?.signIn.token,
    loading,
    error,
  };
}
