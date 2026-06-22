import { useAppSelector } from '@/hooks/redux';
import { selectUser } from '@/store/modules/user/user-slice.ts';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

export const ProtectedRoutes = (): React.JSX.Element => {
  const location = useLocation();

  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
