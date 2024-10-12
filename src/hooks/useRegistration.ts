import { FormEvent, useContext, useState } from 'react';

import { handleRegistration } from '../services/authService';
import { useRouter } from 'next/router';
import { ModalsContext } from '../../pages/_app';

export const useRegistration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { closeModal } = useContext(ModalsContext);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('Все поля являются обязательными');
      return;
    }

    try {
      await handleRegistration(username, email, password, router);
      alert('Регистрация завершена!');
      setUsername('');
      setEmail('');
      setPassword('');
      closeModal();
    } catch (error) {
      setError('Ошибка при регистрации. Попробуйте снова!');
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};
