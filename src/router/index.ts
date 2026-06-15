import { AuthRoutes } from '@/layouts/auth-routes/auth-routes.tsx';
import { FullLayout } from '@/layouts/full-layout/full-layout';
import { ProtectedRoutes } from '@/layouts/protected-routes/protected-routes';
import { createBrowserRouter } from 'react-router-dom';

import { FeedPage } from '@pages/feed-page/feed-page';
import { ForgotPasswordPage } from '@pages/forgot-password-page/forgot-password-page';
import { Home } from '@pages/home/home';
import { IngredientDetails } from '@pages/ingridient-details/ingridient-details';
import { LoginPage } from '@pages/login-page/login-page';
import { OrdersPage } from '@pages/profile-page/orders-page/orders-page';
import { ProfileForm } from '@pages/profile-page/profile-form/profile-form';
import { ProfilePage } from '@pages/profile-page/profile-page';
import { RegisterPage } from '@pages/register-page/register-page';
import { ResetPasswordPage } from '@pages/reset-password/reset-password';

export const router = createBrowserRouter([
  {
    Component: FullLayout,
    children: [
      {
        Component: AuthRoutes,
        children: [
          {
            path: '/register',
            Component: RegisterPage,
          },
          {
            path: '/login',
            Component: LoginPage,
          },
          {
            path: '/reset-password',
            Component: ResetPasswordPage,
          },
          {
            path: '/forgot-password',
            Component: ForgotPasswordPage,
          },
        ],
      },
      {
        path: '/',
        Component: Home,
        children: [
          {
            path: '/ingredient/:id',
            Component: IngredientDetails,
          },
        ],
      },
      {
        Component: ProtectedRoutes,
        children: [
          {
            path: '/',
            Component: Home,
          },
          {
            path: '/profile',
            Component: ProfilePage,
            children: [
              {
                index: true,
                Component: ProfileForm,
              },
              {
                path: '/profile/orders',
                Component: OrdersPage,
              },
            ],
          },
          {
            path: '/feed',
            Component: FeedPage,
          },
        ],
      },
    ],
  },
]);
