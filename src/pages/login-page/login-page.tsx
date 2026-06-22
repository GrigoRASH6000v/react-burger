import { useAppDispatch } from '@/hooks/redux';
import { useLoginMutation } from '@/store/api/authApi/authApi.ts';
import { setUser } from '@/store/modules/user/user-slice';
import { Input, Button, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ErrorMessage } from '@components/error-message/error-message.tsx';
import { SuccessMessage } from '@components/success-message/success-message.tsx';
import { EMAIL_REGEXP } from '@utils/validate';

import type { Form } from './types';

import styles from './login-page.module.css';

export const LoginPage = (): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = (location.state as { from?: string })?.from ?? '/';
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginMutation();
  const [successMessageIsShow, setSuccessMessageIsShow] = useState(false);
  useEffect(() => {
    if (isSuccess) setSuccessMessageIsShow(true);
  }, [isSuccess]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      const { success, user } = await loginUser(data).unwrap();
      if (success && user) {
        dispatch(setUser(user));
        void navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Ошибка при логине', error);
    }
  };

  if (isLoading) return <Preloader />;
  if (isError) return <ErrorMessage />;
  if (successMessageIsShow)
    return <SuccessMessage onClose={() => setSuccessMessageIsShow(false)} />;

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text text_type_main-medium mb-6">Вход</h3>
      <div className="mb-6">
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email обязателен',
            minLength: { value: 8, message: 'Минимум 8 символов' },
            pattern: {
              value: EMAIL_REGEXP,
              message: 'Введите корректный email',
            },
          }}
          render={({ field }) => (
            <Input
              errorText={errors.email?.message}
              error={!!errors.email}
              placeholder="E-mail"
              type="text"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="mb-6">
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Пароль обязателен',
            minLength: { value: 8, message: 'Минимум 8 символов' },
          }}
          render={({ field }) => (
            <Input
              errorText={errors.password?.message}
              error={!!errors.password}
              placeholder="Пароль"
              type={passwordVisible ? 'text' : 'password'}
              value={field.value}
              icon={passwordVisible ? 'ShowIcon' : 'HideIcon'}
              onIconClick={() => setPasswordVisible(!passwordVisible)}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div className="mb-15">
        <Button htmlType="submit">Войти</Button>
      </div>

      <div className="mb-4">
        <span className="mr-2 text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </span>
        <Link className="text text_type_main-default text_color_link" to="/register">
          Зарегистрироваться
        </Link>
      </div>
      <div>
        <span className="mr-2 text text_type_main-default text_color_inactive">
          Забыли пароль?
        </span>
        <Link
          className="text text_type_main-default text_color_link"
          to="/forgot-password"
        >
          Восстановить пароль
        </Link>
      </div>
    </form>
  );
};
