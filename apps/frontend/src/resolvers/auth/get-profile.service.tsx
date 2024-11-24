import { useLazyQuery } from '@apollo/client';
import { GET_PROFILE } from './auth.graphql';
import { type AuthUser } from './auth.types';

export function useGetProfileQuery() {
  const [getCurrentUser, { data, loading, error, refetch }] = useLazyQuery<{
    getProfile: AuthUser;
  }>(GET_PROFILE);

  return {
    getCurrentUser,
    user: data?.getProfile,
    refetch,
    loading,
    error,
  };
}
