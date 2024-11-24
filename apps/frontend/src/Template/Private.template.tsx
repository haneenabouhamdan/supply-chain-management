import { Outlet } from 'react-router-dom';
import { PrivateRoute } from '../routes/PrivateRoute';
export function PrivateTemplate() {
  return (
    <PrivateRoute>
      <section>
        <Outlet />
      </section>
    </PrivateRoute>
  );
}
