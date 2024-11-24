import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated)
    return <Navigate to="/sign-in" state={{ from: location.pathname }} />;

  return <>{children}</>;
}
