import { Column } from '../store/columnSlice';

export const addColumnService = async (
  token: string,
  userId: string,
  column: Column
): Promise<Column> => {
  const url = 'https://localhost:7048/api/task-columns';

  const options: RequestInit = {
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
  };

  if (!userId) {
    throw new Error('userId не установлен');
  }

  if (!token) {
    throw new Error('token не установлен');
  }

  if (!column.title) {
    throw new Error('Название колонки не может быть пустым');
  }

  const response = await fetch(url, options);

  if (response.ok) {
    const createdColumn = await response.json(); // Получение данных колонки
    console.log('Созданная колонка:', createdColumn); 
    return createdColumn; 
  } else {
    const errorText = await response.text();
    throw new Error(`Ошибка при добавлении колонки: ${errorText}`);
  }
};

export const deleteColumnService = async (
  token: string,
  taskColumnId: number
): Promise<void> => {
  const url = 'https://localhost:7048/api/task-columns';

  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      taskColumnId: taskColumnId, 
    }),
  };

  if (!taskColumnId) {
    throw new Error('taskColumnId не установлен');
  }

  const response = await fetch(url, options);

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
  const url = `https://localhost:7048/api/task-columns/all?userId=${userId}`;

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при получении колонок: ${errorText}`);
  }

  const data = await response.json();

  if (data.userId.toString() !== userId) {
    throw new Error('Полученный userId не совпадает с переданным userId.');
  }

  // Получаем колонки из userTaskColumns
  const userColumns: Column[] = data.userTaskColumns.map(
    (column: { id: number; name: string; content: string }) => ({
      id: column.id,
      title: column.name,
      content: column.content,
    })
  );

  console.log(userColumns);
  return userColumns;
};
