import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { ModalsContext } from '../../pages/_app';

import { handleLogin } from '../services/authService';

export const useLogin = () => {
  const [emailLogin, setEmailLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { closeModal } = useContext(ModalsContext);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await handleLogin(emailLogin, password);
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
