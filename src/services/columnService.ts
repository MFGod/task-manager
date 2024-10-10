import { Column } from '../store/columnSlice';

export const getColumns = async (
  token: string,
  userId: string
): Promise<Column[]> => {
  const response = await fetch('https://localhost:7048/api/task-columns', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка при получении колонок');
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
  const response = await fetch('https://localhost:7048/api/task-columns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...column, userId }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при добавлении колонки');
  }

  return await response.json();
};
