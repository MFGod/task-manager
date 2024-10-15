import { columnIdMap } from '../store/columnSlice';
import { Task } from '../store/taskSlice';

export const getTasksService = async (
  token: string,
  userId: string
): Promise<Task[]> => {
  const response = await fetch('https://localhost:7048/api/user-tasks/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при получении задач: ${errorText}`);
  }

  const tasks = await response.json();

  const userTasks = tasks.filter((task: Task) => task.userId === userId);

  return userTasks;
};

export const addTaskService = async (
  task: Task,
  token: string
): Promise<Task> => {
  if (!task.title) {
    throw new Error('Заголовок должн быть заполнен');
  }
  const userId = localStorage.getItem('userId');

  const columnId = columnIdMap[task.column];

  const dueDateISO = task.dueDate
    ? new Date(task.dueDate).toISOString()
    : new Date().toISOString();

  console.log(`userId:${userId}   `); // Лог для проверки
  console.log(`columnId: ${columnId}`);
  console.log(`title: ${task.title}`);
  console.log(`content: ${task.description}`);
  console.log(`isCompleted: ${task.completed}`);
  console.log(`isInProgress: ${task.inProgress}`);
  console.log(`doTo ${dueDateISO}`);

  const response = await fetch('https://localhost:7048/api/user-tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      columnId: columnId,
      title: task.title,
      content: task.description,
      isCompleted: task.completed,
      isInProgress: task.inProgress,
      doTo: dueDateISO,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при добавлении задачи: ${errorText}`);
  }

  return await response.json();
};
