export const handleRegistration = async (
  username: string,
  email: string,
  password: string
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
    const response = await fetch('/api/auth', {
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

    const { userId, token } = await response.json(); // Сервер возвращает userId и token
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);

    return { userId, token };
  } catch (error) {
    throw new Error('Ошибка при регистрации. Попробуйте снова!');
  }
};

export const handleLogin = async (email: string, password: string) => {
  // Проверка входных данных
  if (!email || !password) {
    throw new Error('Все поля должны быть заполнены');
  }

  const userData = { email, password };

  try {
    const response = await fetch('/api/auth', {
      method: 'GET',
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

    return { userId, token };
  } catch (error) {
    throw new Error('Ошибка при авторизации. Попробуйте снова!');
  }
};
