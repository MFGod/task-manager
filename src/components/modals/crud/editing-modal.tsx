import { FC, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { Task, updateTask } from '../../../store/task-slice';

import { ModalsContext } from '../../../../pages/_app';

import { getUserId } from '../../../hooks/getUserId';
import { getToken } from '../../../hooks/getToken';

import { updatedTaskService } from '../../../services/task-service';

import { TaskForm } from '../../form/task';

import { Title, Wrapper } from '../styles';
interface EditingModalInterface {
  editingTask: Task;
}

export const EditingModal: FC<EditingModalInterface> = ({ editingTask }) => {
  const { closeModal } = useContext(ModalsContext);
  const dispatch = useDispatch();

  const handleUpdateTask = async (task: Task) => {
    try {
      const { token } = getToken();
      const { userId } = getUserId();

      if (!token) {
        console.error('Token отсутствует.');
        throw new Error('Требуется аутентификация. Попробуйте еще раз.');
      }

      if (!userId) {
        console.error('User ID отсутствует.');
        throw new Error(
          'Требуется идентификатор пользователя. Пожалуйста, убедитесь, что вы вошли в систему.'
        );
      }

      const updatedTask = await updatedTaskService(token, task.id, task);
      dispatch(updateTask(updatedTask));
      closeModal();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Wrapper>
      <Title>Редактирование</Title>
      <TaskForm
        onAdd={handleUpdateTask}
        editingTask={editingTask}
        columnId={editingTask.columnId}
      />
    </Wrapper>
  );
};
