import { FC, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { Task, updateTask } from '../../../store/task-slice';

import { ModalsContext } from '../../../../pages/_app';

import { TaskForm } from '../../form/task';

import { Title, Wrapper } from '../styles';
import { getUserId } from '../../../hooks/getUserId';

interface EditingModalInterface {
  editingTask: Task;
}

export const EditingModal: FC<EditingModalInterface> = ({ editingTask }) => {
  const { closeModal } = useContext(ModalsContext);
  const dispatch = useDispatch();

  const handleAddOrUpdateTask = (task: Task) => {
    const { userId } = getUserId();

    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    dispatch(updateTask({ ...task, userId }));
    closeModal();
  };

  return (
    <Wrapper>
      <Title>Редактирование</Title>
      <TaskForm
        onAdd={handleAddOrUpdateTask}
        editingTask={editingTask}
        columnId={editingTask.columnId}
      />
    </Wrapper>
  );
};
