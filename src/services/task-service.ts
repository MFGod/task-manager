import { Task } from '../store/task-slice';

interface CreateTaskResponse {
  createdTaskId: number;
  columnId: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isInProgress: boolean;
  complitedAt: string;
}

export const addTaskService = async (
  task: Omit<Task, 'id'>,
  token: string
): Promise<CreateTaskResponse> => {
  if (!task.title) {
    throw new Error('Заголовок должен быть заполнен');
  }
  const userId = localStorage.getItem('userId');

  const response = await fetch('https://localhost:7048/api/user-tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      columnId: task.columnId,
      title: task.title,
      description: task.description,
      isCompleted: task.completed,
      isInProgress: task.inProgress,
      complitedAt: task.complitedAt,
    }),
  });

  if (response.ok) {
    const createdTask = await response.json(); // Получение данных созданной колонки
    console.log('Созданная колонка:', createdTask);
    return createdTask;
  } else {
    const errorText = await response.text();
    throw new Error(`Ошибка при добавлении колонки: ${errorText}`);
  }
};

export const getTasksService = async (
  token: string,
  userId: string
): Promise<Task[]> => {
  const response = await fetch(
    `https://localhost:7048/api/user-tasks/all?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при получении задач: ${errorText}`);
  }

  const tasks = await response.json();
  console.log('Полученные задачи:', tasks);
  return tasks.userTasks;
};

export const deleteTaskService = async (
  confirmDeleteTaskId: number,
  token: string
) => {
  const response = await fetch('https://localhost:7048/api/user-tasks/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      taskId: confirmDeleteTaskId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при получении задач: ${errorText}`);
  }

  return response.json();
};
