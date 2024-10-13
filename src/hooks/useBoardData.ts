import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getColumnsService } from '../services/columnService';
import { getTasksService } from '../services/taskService';

import { setColumns } from '../store/columnSlice';
import { setTasks } from '../store/taskSlice';

export const useBoardData = () => {
  const dispatch = useDispatch();

  // Загружаем колонок из API
  const loadColumns = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      try {
        const columnsData = await getColumnsService(token, userId);
        console.log('Полученные колонки:', columnsData);
        dispatch(setColumns(columnsData));
      } catch (error) {
        console.error('Ошибка при загрузке колонок:', error);
      }
    }
  };

  // Загрузка задач из API
  const loadTasks = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
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
};
