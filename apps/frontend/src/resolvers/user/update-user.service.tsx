import { useMutation } from '@apollo/client';
import { UPDATE_USER, UpdateUserInput } from './Queries';
import { GET_PROFILE } from '../auth/auth.graphql';
import { QueriesStore } from './Queries/queriesStore';

interface UpdateUserResponse {
  id: string;
}

export function useUpdateUserMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { updateUser: UpdateUserResponse },
    { updateUserDto: UpdateUserInput }
  >(UPDATE_USER);

  async function updateUser(payload: UpdateUserInput) {
    await mutate({
      variables: {
        updateUserDto: payload,
      },
      refetchQueries: [
        {
          query: GET_PROFILE,
          variables: QueriesStore.get('GET_PROFILE'),
        },
      ],
    });
  }

  return {
    updateUser,
    isUserUpdated: Boolean(data?.updateUser) && !error,
    updating: loading,
    error,
  };
}
