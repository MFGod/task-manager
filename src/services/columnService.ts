import { Column } from '../store/columnSlice';

export const getColumns = async (
  token: string,
  userId: string
): Promise<Column[]> => {
  if (!userId) {
    throw new Error('userId не установлен');
  }

  const response = await fetch('https://localhost:7048/api/task-columns', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    console.log('Колонки успешно получены!');
  } else {
    const errorText = await response.text();
    throw new Error(`Ошибка при получении колонок: ${errorText}`);
  }

  const columns = await response.json();
  // Фильтруем колонки по userId
  const userColumns = columns.filter(
    (column: Column) => column.userId === userId
  );

  return userColumns;
};

export const addColumnApi = async (
  token: string,
  userId: string,
  column: Column
): Promise<Column> => {
  if (!userId) {
    throw new Error('userId не установлен');
  }

  if (!column.title) {
    throw new Error('Название колонки не может быть пустым');
  }

  const response = await fetch('https://localhost:7048/api/task-columns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...column, userId }),
  });

  if (response.ok) {
    console.log('Колонка успешно добавлена!');
  } else {
    const errorText = await response.text();
    throw new Error(`Ошибка при добавлении колонки: ${errorText}`);
  }

  return await response.json();
};
