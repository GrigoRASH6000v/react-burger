import { useAppDispatch } from '@/hooks/redux';
import { useLogoutMutation } from '@/store/api/authApi/authApi';
import { setUser } from '@/store/modules/user/user-slice';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import type { NavItem } from './types';

import styles from './profile-page.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navItems: NavItem[] = [
    {
      id: 1,
      name: 'Профиль',
      path: '/profile',
    },
    {
      id: 2,
      name: 'История заказов',
      path: '/profile/orders',
    },
    {
      id: 3,
      name: 'Выход',
      action: 'logout',
    },
  ];
  const { pathname: currentPath } = useLocation();
  const handleNavClick = async (item: NavItem): Promise<void> => {
    if (item.action && item.action === 'logout') {
      await logout();
      dispatch(setUser(null));
      void navigate('/login');
    }
  };

  if (isLoading) return <Preloader />;

  return (
    <div className={styles.profile}>
      <nav className={styles.navigation}>
        <ul className={styles.navigation_list}>
          {navItems.map((item: NavItem) => (
            <li
              className={`${styles.nav_item} ${currentPath !== item.path ? 'text_color_inactive' : ''} text text_type_main-medium`}
              key={`nav-item-${item.id}`}
              onClick={() => void handleNavClick(item)}
            >
              {item.path && <Link to={item.path}>{item.name}</Link>}
              {item.action && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
        <span className={`${styles.hint} text text_type_main-small`}>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
