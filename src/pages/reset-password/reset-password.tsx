import { useConfirmResetPasswordMutation } from '@/store/api/authApi/authApi';
import { Button, Input, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { ErrorMessage } from '@components/error-message/error-message';
import { SuccessMessage } from '@components/success-message/success-message';
import { PASSWORD_REGEXP } from '@utils/validate';

import type { Form } from './types';

import styles from './reset-password.module.css';

export const ResetPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [confirmReset, { isLoading }] = useConfirmResetPasswordMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      password: '',
      token: '',
    },
  });

  useEffect(() => {
    if (!localStorage.getItem('forgot-password-page-is-visited')) void navigate(-1);
  }, []);

  const [passwordVisible, setPasswordVisible] = useState(false);

  if (!localStorage.getItem('forgot-password-page-is-visited')) {
    return <Navigate to="/login" replace />;
  }
  if (isError) return <ErrorMessage />;
  if (isSuccess)
    return (
      <SuccessMessage
        onClose={() => void navigate('/login')}
        text="Пароль успешно обновлён"
        textButton="Авторизоваться"
      />
    );
  if (isLoading) return <Preloader />;

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      const { success } = await confirmReset({
        password: data.password,
        token: data.token,
      }).unwrap();

      if (success) {
        setIsSuccess(true);
        const timeoutId = setTimeout(() => {
          void navigate('/login');
          localStorage.removeItem('forgot-password-page-is-visited');
          clearTimeout(timeoutId);
        }, 4000);
      }
    } catch (error) {
      console.error('Ошибка при восстановлении пароля', error);
      setIsError(true);
    }
  };

  return (
    <div className={styles.form}>
      <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Пароль обязателен',
              minLength: { value: 8, message: 'Минимум 8 символов' },
              pattern: {
                value: PASSWORD_REGEXP,
                message: 'Невалидный пароль',
              },
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

        <div className="mb-6">
          <Controller
            name="token"
            control={control}
            rules={{ required: 'Код обязателен' }}
            render={({ field }) => (
              <Input
                errorText={errors.token?.message}
                error={!!errors.token}
                placeholder="Введите код из письма"
                type="text"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mb-15">
          <Button type="primary" size="medium" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </form>

      <div>
        <span className="mr-2 text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </span>
        <Link className="text text_type_main-default text_color_link" to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
};
