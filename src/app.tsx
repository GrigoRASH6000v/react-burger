import { router } from '@/router';
import { useGetUserQuery } from '@/store/api/authApi/authApi';
import { setUser } from '@/store/modules/user/user-slice';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

export const App = (): React.JSX.Element => {
  const { isLoading, data } = useGetUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.success && data.user) {
      dispatch(setUser(data.user));
    }
  }, [dispatch, data]);

  if (isLoading) return <Preloader />;
  return <RouterProvider router={router} />;
};
