import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { ModalsContext } from '../../../../pages/_app';

import { addTask, Task } from '../../../store/taskSlice';

import { getCurrentDate } from '../../../utils/dateUtils';

import { TaskForm } from '../../form/task';

import { Title, Wrapper } from '../styles';

export const AddModal = () => {
  const { closeModal } = useContext(ModalsContext);
  const dispatch = useDispatch();

  const handleAddTask = (
    task: Omit<Task, 'id' | 'userId' | 'createdDate' | 'column'>
  ) => {
    const userId = localStorage.getItem('userId') || '';

    const newTask: Task = {
      ...task,
      id: uuidv4(), // Генерация нового ID для задачи
      userId,
      createdDate: getCurrentDate(), // Установить текущую дату
      column: 'todo', // Задачи по умолчанию добавляются в колонку "Нужно сделать"
    };

    dispatch(addTask(newTask));
    closeModal();
  };

  return (
    <Wrapper>
      <Title>Новый список</Title>
      <TaskForm onAdd={handleAddTask} />
    </Wrapper>
  );
};
