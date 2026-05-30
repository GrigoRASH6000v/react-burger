import { useRegisterUserMutation } from '@/store/api/authApi/authApi.ts';
import { Button, Input, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@components/error-message/error-message';
import { SuccessMessage } from '@components/success-message/success-message.tsx';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '@utils/validate';

import type { Form } from './types';

import styles from './register-page.module.css';

export const RegisterPage = (): React.JSX.Element => {
  const [registerUser, { isLoading, isError, isSuccess }] = useRegisterUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessageShown, setSuccessMessageShown] = useState(false);

  useEffect((): void => {
    if (isSuccess) setSuccessMessageShown(true);
  }, [isSuccess]);

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      await registerUser(data);
    } catch (error) {
      console.error('Ошибка при регистрации пользователя', error);
    }
  };

  if (isLoading) return <Preloader />;
  if (isError) return <ErrorMessage />;
  if (successMessageShown)
    return (
      <SuccessMessage
        text="Вы успешно прошли регисрацию!"
        onClose={() => setSuccessMessageShown(false)}
      />
    );

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
      <div className="mb-6">
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Имя обязательно' }}
          render={({ field }) => (
            <Input
              errorText={errors.name?.message}
              error={!!errors.name}
              placeholder="Имя"
              type="text"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
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
      <div className="mb-15">
        <Button htmlType="submit">Зарегистрироваться</Button>
      </div>
      <div>
        <span className="mr-2 text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </span>
        <Link className="text text_type_main-default text_color_link" to="/login">
          Войти
        </Link>
      </div>
    </form>
  );
};
