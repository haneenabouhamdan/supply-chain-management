import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts';
import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';

export function PublicTemplate() {
  const { isAuthenticated, isAuthenticating } = useAuthContext();

  if (isAuthenticating) {
    return (
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}
