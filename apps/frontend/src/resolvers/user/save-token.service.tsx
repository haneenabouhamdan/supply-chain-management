import { useMutation } from '@apollo/client';
import { SAVE_TOKEN } from './Queries';

interface SaveTokenResponse {
  message: string;
}

interface SaveTokenVariables {
  userId: string;
  token: string;
}

export function useSaveTokenMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { saveToken: SaveTokenResponse },
    SaveTokenVariables
  >(SAVE_TOKEN);

  async function saveToken(userId: string, token: string) {
    await mutate({
      variables: {
        userId,
        token,
      },
    });
  }

  return {
    saveToken,
    isTokenSaved: Boolean(data?.saveToken) && !error,
    saving: loading,
    error,
  };
}
