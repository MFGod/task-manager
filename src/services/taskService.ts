import { Task } from '../store/taskSlice';
import { getCurrentDate } from '../utils/dateUtils';

export const getTasks = async (
  accessTokenString: string,
  userId: string
): Promise<Task[]> => {
  const response = await fetch('https://localhost:7048/api/user-tasks/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenString}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при получении задач: ${errorText}`);
  }

  const tasks = await response.json();
  // Фильтруем задачи по userId
  const userTasks = tasks.filter((task: Task) => task.userId === userId);

  return userTasks;
};

export const addTask = async (task: Task, accessTokenString: string): Promise<Task> => {
  if (!task.title) {
    throw new Error('Заголовок должн быть заполнен');
  }

  const response = await fetch('https://localhost:7048/api/user-tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenString}`,
    },
    body: JSON.stringify({
      ...task,
      userId: localStorage.getItem('userId'),
      createdDate: getCurrentDate(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при добавлении задачи: ${errorText}`);
  }

  return await response.json();
};
