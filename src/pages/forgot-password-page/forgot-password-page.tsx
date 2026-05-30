import { useResetPasswordMutation } from '@/store/api/authApi/authApi';
import { Input, Button, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { ErrorMessage } from '@components/error-message/error-message';
import { SuccessMessage } from '@components/success-message/success-message';
import { EMAIL_REGEXP } from '@utils/validate';

import type { Form } from './types';

import styles from './forgot-password-page.module.css';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isError, isSuccess }] = useResetPasswordMutation();
  const [successMessageIsShow, setSuccessMessageIsShow] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessageIsShow(true);
      localStorage.setItem('forgot-password-page-is-visited', 'true');
    }
  }, [isSuccess]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      await resetPassword(data).unwrap();
    } catch (error) {
      console.error('Ошибка при восстановлении пароля', error);
    }
  };

  if (isError) return <ErrorMessage />;
  if (successMessageIsShow)
    return (
      <SuccessMessage
        onClose={() => void navigate('/reset-password')}
        text="Инструкция по восстановлению пароля отправлена на email"
        textButton="Восстановить"
      />
    );
  if (isLoading) return <Preloader />;

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
      <div className="mb-6">
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email обязателен',
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
      <div className="mb-15">
        <Button htmlType="submit">Восстановить</Button>
      </div>

      <div className="mb-4">
        <span className="mr-2 text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </span>
        <Link className="text text_type_main-default text_color_link" to="/login">
          Войти
        </Link>
      </div>
    </form>
  );
};
