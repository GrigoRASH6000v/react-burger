import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const { pathname: ActivePath } = useLocation();
  const routes = [
    { path: '/', label: 'Конструктор', icon: BurgerIcon },
    { path: '/feed', label: 'Лента заказов', icon: ListIcon },
  ];
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {routes.map(({ path, label, icon: Icon }, idx) => (
            <Link
              className={`${styles.link} ${path === ActivePath && styles.link_active} ${idx > 0 && 'ml-10'}`}
              key={`header-nav-link-${path}`}
              to={path}
            >
              <Icon type={path === ActivePath ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">{label}</p>
            </Link>
          ))}
        </div>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <Link
          to="/profile"
          className={`${styles.link} ${styles.link_position_last} ${ActivePath === '/profile' && styles.link_active}`}
        >
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </Link>
      </nav>
    </header>
  );
};
