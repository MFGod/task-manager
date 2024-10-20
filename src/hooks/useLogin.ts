import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { ModalsContext } from '../../pages/_app';

import { handleLogin } from '../services/auth-service';

export const useLogin = () => {
  const { closeModal } = useContext(ModalsContext);
  const [emailLogin, setEmailLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await handleLogin(emailLogin, password, router);
      router.push('/all');
      alert('Авторизация успешно завершена!');
      closeModal();
    } catch (error) {
      setError('Ошибка авторизации. Проверьте данные и попробуйте снова.');
    }
  };

  return {
    emailLogin,
    setEmailLogin,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};
