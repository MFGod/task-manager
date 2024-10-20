import { IColumn } from '../store/column-slice';

export const addColumnService = async (
  token: string,
  userId: string,
  column: Omit<IColumn, 'id'>
): Promise<IColumn> => {
  if (!userId || !token) {
    throw new Error('Необходимы userId и token');
  }

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

  if (!column.title) {
    throw new Error('Название колонки не может быть пустым');
  }

  const response = await fetch(url, options);

  if (response.ok) {
    const createdColumn = await response.json(); // Получение данных созданной колонки
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

export const getAllColumnsService = async (
  token: string,
  userId: string
): Promise<IColumn[]> => {
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

  // Получаем все колонки из taskColumns
  const userColumns: IColumn[] = data.taskColumns.map(
    (column: { id: number; name: string; description: string }) => ({
      id: column.id,
      title: column.name,
      description: column.description,
    })
  );

  return userColumns;
};

export const getColumnByIdService = async (
  token: string,
  taskColumnId: number
): Promise<IColumn> => {
  const url = `https://localhost:7048/api/task-columns?TaskColumnId=${taskColumnId}`;

  try {
    const response = await fetch(url, {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка получения колонки: ${errorText}`);
    }

    const columnData: IColumn = await response.json();
    console.log(`Колонка ${columnData} успешно получена.`);
    return columnData;
  } catch (error) {
    console.error('Ошибка при получении колонки:', error);
    throw new Error('Не удалось получить колонку.');
  }
};
