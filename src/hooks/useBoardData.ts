import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  getAllColumnsService,
  getColumnByIdService,
} from '../services/column-service';
import { getTasksService } from '../services/task-service';

import { setColumns } from '../store/column-slice';
import { setTasks } from '../store/task-slice';

export const useBoardData = () => {
  const dispatch = useDispatch();

  // Состояния для обработки загрузки и ошибок
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Загрузка всех колонок из API
  const loadAllColumns = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      try {
        setLoading(true);
        const columnsData = await getAllColumnsService(token, userId);
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

  // Загразка одной колонки по ее ID
  const loadColumnById = async (taskColumnId: number) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        setLoading(true);
        const columnData = await getColumnByIdService(token, taskColumnId);
        console.log('Колонка успешно загружена', columnData);
        dispatch(setColumns([columnData]));
      } catch (error) {
        setError(error as Error);
        console.error('Ошибка при загрузке колонки:', error);
      } finally {
        setLoading(false);
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
    loadAllColumns();
    loadTasks();
  }, [dispatch]);

  return { loading, error, loadColumnById };
};
