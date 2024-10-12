import { Task } from '../store/taskSlice';
import { getCurrentDate } from '../utils/dateUtils';

export const getTasks = async (
  token: string,
  userId: string
): Promise<Task[]> => {
  const response = await fetch('https://localhost:7048/api/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    console.log('Задачи получены!');
  } else {
    const errorText = await response.text();
    throw new Error(`Ошибка при получении задач: ${errorText}`);
  }

  const tasks = await response.json();
  // Фильтруем задачи по userId
  const userTasks = tasks.filter((task: Task) => task.userId === userId);

  return userTasks;
};

export const addTask = async (task: Task, token: string): Promise<Task> => {
  if (!task.title) {
    throw new Error('Заголовок должн быть заполнен');
  }

  const response = await fetch('https://localhost:7048/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...task,
      userId: localStorage.getItem('userId'),
      createdDate: getCurrentDate(),
    }),
  });

  if (response.ok) {
    console.log('Добавлена новая задача!');
  } else {
    const errorText = await response.text();
    throw new Error(`Ошибка при добавлении задачи: ${errorText}`);
  }

  return await response.json();
};
