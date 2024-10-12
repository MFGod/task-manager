import { NextRouter } from 'next/router';

export const handleRegistration = async (
  username: string,
  email: string,
  password: string,
  router: NextRouter
) => {
  // Проверка входных данных
  if (!username || !email || !password) {
    throw new Error('Все поля должны быть заполнены');
  }

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
      const errorText = await response.text();
      throw new Error(`Ошибка при регистрации: ${errorText}`);
    }

    const { userId, accessTokenString } = await response.json(); // Сервер возвращает userId и token
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', accessTokenString);

    router.push('/all');

    return { userId, accessTokenString };
  } catch (error) {
    throw new Error('Ошибка при регистрации. Попробуйте снова!');
  }
};

export const handleLogin = async (
  emailLogin: string,
  password: string,

) => {
  // Проверка входных данных
  if (!emailLogin || !password) {
    throw new Error('Все поля должны быть заполнены');
  }

  const userData = { emailLogin, password };

  console.log(JSON.stringify(userData));

  try {
    const response = await fetch('https://localhost:7048/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Неверные учетные данные');
    }

    const { userId, accessTokenString } = await response.json(); // Сервер возвращает userId и token
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', accessTokenString);

   

    return { userId, accessTokenString };
  } catch (error) {
    throw new Error('Ошибка при авторизации. Попробуйте снова!');
  }
};
