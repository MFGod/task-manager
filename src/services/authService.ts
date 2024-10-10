import { useRouter } from 'next/router';

export const handleLogin = async (email: string, password: string) => {
  const userData = { email, password };

  try {
    const response = await fetch('https://localhost:7048/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Неверные учетные данные');
    }

    const { userId, token } = await response.json(); // Сервер возвращает userId и token
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);

    const router = useRouter();
    router.push('/all');

    return { userId, token };
  } catch (error) {
    throw new Error('Ошибка при авторизации. Попробуйте снова!');
  }
};

export const handleRegistration = async (
  username: string,
  email: string,
  password: string
) => {
  const userData = {
    username,
    email,
    password,
  };

  try {
    const response = await fetch('https://localhost:7048/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Ошибка при регистрации!');
    }

    const { userId, token } = await response.json(); // Сервер возвращает userId и token
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);

    const router = useRouter();

    router.push('/all');

    return { userId, token };
  } catch (error) {
    throw new Error('Ошибка при регистрации. Попробуйте снова!');
  }
};
