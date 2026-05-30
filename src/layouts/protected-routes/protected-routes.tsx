import { selectUser } from '@/store/modules/user/user-slice.ts';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

export const ProtectedRoutes = (): React.JSX.Element => {
  const location = useLocation();

  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
