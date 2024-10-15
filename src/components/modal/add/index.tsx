import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { ModalsContext } from '../../../../pages/_app';

import { addTask, Task } from '../../../store/taskSlice';

import { addTaskService } from '../../../services/taskService';

import { getCurrentDate } from '../../../utils/dateUtils';

import { TaskForm } from '../../form/task';

import { Title, Wrapper } from '../styles';

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
      return;
    }

    const newTask: Task = {
      ...task,
      id: uuidv4(),
      userId,
      createdDate: getCurrentDate(),
      column: 'todo',
      dueDate: task.dueDate || '',
      completed: false,
      deleted: false,
      inProgress: false,
    };

    try {
      // Отправка задачи на сервер
      await addTaskService(newTask, token);
      dispatch(addTask(newTask));
      closeModal();
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  return (
    <Wrapper>
      <Title>Новый список</Title>
      <TaskForm onAdd={handleAddTask} />
    </Wrapper>
  );
};
