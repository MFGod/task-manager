import { FormEvent, useState } from 'react';

import { handleRegistration } from '../services/authService';
import { useRouter } from 'next/router';

export const useRegistration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
