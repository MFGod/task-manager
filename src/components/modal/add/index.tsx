import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { ModalsContext } from '../../../../pages/_app';

import { getCurrentDate } from '../../../utils/dateUtils';

import { TaskForm } from '../../form/task';

import { Title, Wrapper } from '../styles';
import { addTask, Task } from '../../../store/taskSlice';
import { addTaskService } from '../../../services/taskService';

export const AddModal = () => {
  const { closeModal } = useContext(ModalsContext);
  const dispatch = useDispatch();

  const handleAddTask = async (
    task: Omit<Task, 'id' | 'userId' | 'createdDate' | 'column'>
  ) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      console.error('Необходим токен и userId для добавления колонки.');
      return; // Выход из функции, если токен или userId отсутствуют
    }
    
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      userId,
      createdDate: getCurrentDate(),
      column: 'todo',
      dueDate: task.dueDate || '', // Обязательно добавьте dueDate, если требуется
      completed: false,
      deleted: false,
      inProgress: false,
    };

    try {
      // Отправка задачи на сервер
      await addTaskService(newTask, token); // Передайте accessToken
      dispatch(addTask(newTask)); // Добавление задачи в Redux
      closeModal();
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
      // Можно показать сообщение пользователю о возникшей ошибке
    }
  };

  return (
    <Wrapper>
      <Title>Новый список</Title>
      <TaskForm onAdd={handleAddTask} />
    </Wrapper>
  );
};
