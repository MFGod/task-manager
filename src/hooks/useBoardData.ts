import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getColumnsService } from '../services/columnService';
import { getTasksService } from '../services/taskService';

import { setColumns } from '../store/columnSlice';
import { setTasks } from '../store/taskSlice';

export const useBoardData = () => {
  const dispatch = useDispatch();

  // Состояния для обработки загрузки и ошибок
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Загружаем колонок из API
  const loadColumns = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      try {
        setLoading(true);
        console.log('Hello World');
        const columnsData = await getColumnsService(token, userId);
        console.log('Полученные колонки:', columnsData);
        dispatch(setColumns(columnsData));
      } catch (error) {
        setError(error as Error);
        console.error('Ошибка при загрузке колонок:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Загрузка задач из API
  const loadTasks = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log('Token:', token);
    console.log('User ID:', userId);
    if (token && userId) {
      try {
        const tasksData = await getTasksService(token, userId); // Получаем задачи по userId
        console.log('Полученные задачи:', tasksData);
        dispatch(setTasks(tasksData));
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error);
      }
    }
  };

  // Загрузка колонок и задач при монтировании компонента
  useEffect(() => {
    loadColumns();
    loadTasks();
  }, [dispatch]);

  return { loading, error };
};
