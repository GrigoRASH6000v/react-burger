import { useAppSelector } from '@/hooks/redux';
import { selectUser } from '@/store/modules/user/user-slice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import styles from './auth-routes.module.css';

export const AuthRoutes = (): React.JSX.Element => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (user) {
    const from = (location.state as { from?: string })?.from ?? '/';
    return <Navigate to={from} replace />;
  }

  return (
    <div className={styles.auth_container}>
      <Outlet />
    </div>
  );
};
