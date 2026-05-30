import { useUpdateUserMutation } from '@/store/api/authApi/authApi';
import { selectUser, setUser } from '@/store/modules/user/user-slice';
import { Button, Input, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { ErrorMessage } from '@components/error-message/error-message.tsx';
import { SuccessMessage } from '@components/success-message/success-message.tsx';

import type { Form } from './types';

import styles from './profile-form.module.css';

export const ProfileForm = (): React.JSX.Element => {
  const user = useSelector(selectUser);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();
  const [successMessageIsShow, setSuccessMessageIsShow] = useState(false);
  const dispatch = useDispatch();

  const defaultForm = (): Form => ({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<Form>({
    defaultValues: defaultForm(),
  });

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      const { success, user } = await updateUser(data).unwrap();
      if (success) {
        setSuccessMessageIsShow(true);
        dispatch(setUser(user));
        reset(defaultForm());
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя', error);
    }
  };

  if (isError) return <ErrorMessage />;
  if (isLoading) return <Preloader />;
  if (successMessageIsShow)
    return (
      <SuccessMessage
        text="Данные успешно изменены"
        onClose={() => setSuccessMessageIsShow(false)}
      />
    );

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Имя обязательно',
            minLength: { value: 2, message: 'Минимум 2 символа' },
          }}
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
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Введите корректный email',
            },
          }}
          render={({ field }) => (
            <Input
              errorText={errors.email?.message}
              error={!!errors.email}
              placeholder="Логин"
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

      {isDirty && (
        <div className={`mb-15 ${styles.buttons}`}>
          <div className="mr-5">
            <Button htmlType="submit">Сохранить</Button>
          </div>
          <div>
            <Button onClick={() => reset(defaultForm())}>Отмена</Button>
          </div>
        </div>
      )}
    </form>
  );
};
