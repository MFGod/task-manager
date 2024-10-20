import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Modal } from '../../../modules/modal';

import { addTask, Task } from '../../../store/task-slice';

import { getCurrentDate } from '../../../utils/date-utils';

import { addTaskService } from '../../../services/task-service';

import { TaskForm } from '../../form/task';

import { Title } from '../styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
`;

type NewTask = Omit<Task, 'id'>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
}

export const AddTaskModal = ({ isOpen, onClose, columnId }: Props) => {
  const dispatch = useDispatch();

  const handleAddTask = async (
    task: Omit<NewTask, 'userId' | 'createdDate' | 'column'>
  ) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      console.error('Необходим токен и userId для добавления задачи.');
      return;
    }

    const newTask: NewTask = {
      ...task,
      userId,
      columnId: columnId,
      createdAt: getCurrentDate(),
      complitedAt: task.complitedAt || '',
      inProgress: false,
      completed: false,
      deleted: false,
    };

    try {
      // Отправка задачи на сервер
      let createdTask = await addTaskService(newTask, token);
      console.log(task);
      dispatch(addTask({ ...task, id: createdTask.createdTaskId }));
      onClose();
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <Title>Новый список</Title>
        <TaskForm onAdd={handleAddTask} columnId={columnId} />
      </Wrapper>
    </Modal>
  );
};
