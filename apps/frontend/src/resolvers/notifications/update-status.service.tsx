import { useMutation } from '@apollo/client';
import { UPDATE_STATUS } from './Queries';

interface UpdateStatusResponse {
  updateStatus: {
    message: string;
  };
}

interface UpdateStatusVariables {
  updateStatusId: string;
  status: string;
}

export function useUpdateNotificationStatusMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    UpdateStatusResponse,
    UpdateStatusVariables
  >(UPDATE_STATUS);

  const updateStatus = async (id: string, status: string) => {
    const response = await mutate({
      variables: {
        updateStatusId: id,
        status: status,
      },
    });
    return response;
  };

  return {
    updateStatus,
    data,
    loading,
    error,
  };
}
