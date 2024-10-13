import { Column } from '../store/columnSlice';

export const addColumnService = async (
  token: string,
  userId: string,
  column: Column
): Promise<Column> => {
  if (!userId) {
    throw new Error('userId не установлен');
  }

  if (!token) {
    throw new Error('token не установлен');
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
    body: JSON.stringify({
      userId: userId,
      name: column.title,
      description: null,
    }),
  });

  if (response.ok) {
    const createdColumn = await response.json(); // Получение данных колонки
    console.log('Созданная колонка:', createdColumn); // Вывод созданной колонки
    return createdColumn; // Возвращаем созданную колонку
  } else {
    const errorText = await response.text();
    throw new Error(`Ошибка при добавлении колонки: ${errorText}`);
  }
};

export const deleteColumnService = async (
  token: string,
  taskColumnId: number
): Promise<void> => {
  if (!taskColumnId) {
    throw new Error('taskColumnId не установлен');
  }

  const response = await fetch('https://localhost:7048/api/task-columns/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      taskColumnId: taskColumnId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при удалении колонки: ${errorText}`);
  }

  console.log(`Колонка с ID ${taskColumnId} успешно удалена.`);
};

export const getColumnsService = async (
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

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при получении колонок: ${errorText}`);
  }

  const columns = await response.json();

  // Фильтруем колонки по userId
  const userColumns: Column[] = columns
    .filter((column: { userId: string }) => column.userId === userId)
    .map((column: { taskColumnId: number; name: string }) => ({
      id: column.taskColumnId.toString(),
      title: column.name,
    }));
  console.log(userColumns);
  return userColumns;
};
