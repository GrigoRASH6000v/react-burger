import { selectUser } from '@/store/modules/user/user-slice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import styles from './auth-routes.module.css';

export const AuthRoutes = (): React.JSX.Element => {
  const user = useSelector(selectUser);
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
