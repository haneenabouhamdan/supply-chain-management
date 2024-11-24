import { useQuery } from '@apollo/client';
import { GET_USER, User } from './Queries';

interface UserDetailsDto {
  user: User;
}

export function useUserDetails(userId: string) {
  const { data, loading, error } = useQuery<UserDetailsDto>(GET_USER, {
    variables: { userId },
  });

  return {
    data: data?.user,
    loading,
    error,
  };
}
