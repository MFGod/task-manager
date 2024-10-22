import { FC, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { ModalsContext } from '../../../pages/_app';
import { deleteTask } from '../../store/task-slice';

import { Modal } from '../../modules/modal';

import { ViewModal } from './crud/view-modal';
import { EditingModal } from './crud/editing-modal';
import { DeleteModal } from './crud/delete-modal';

import { RegistrationModal } from './auth/registration-modal';
import { LoginModal } from './auth/login-modal';
import { deleteTaskService } from '../../services/task-service';
import { getToken } from '../../hooks/getToken';
import { getUserId } from '../../hooks/getUserId';

export const ModalComponent: FC = () => {
  const {
    isModalOpen,
    modalMode,
    closeModal,
    editingTask,
    confirmDeleteTaskId,
  } = useContext(ModalsContext);

  const dispatch = useDispatch();

  const confirmDeleteTask = async () => {
    if (confirmDeleteTaskId) {
      const { token } = getToken();
      const { userId } = getUserId();

      if (!token || !userId) {
        console.error('Необходим токен и userId для добавления задачи.');
        return;
      }

      try {
        // Отправка задачи на сервер
        await deleteTaskService(confirmDeleteTaskId, token);
        dispatch(deleteTask(confirmDeleteTaskId));
        closeModal();
      } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
      }
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {modalMode === 'view' && editingTask && (
        <ViewModal editingTask={editingTask} />
      )}

      {modalMode === 'edit' && editingTask && (
        <EditingModal editingTask={editingTask} />
      )}

      {modalMode === 'confirmDelete' && editingTask && (
        <DeleteModal
          editingTask={editingTask}
          confirmDeleteTask={confirmDeleteTask}
        />
      )}

      {modalMode === 'registration' && <RegistrationModal />}

      {modalMode === 'login' && <LoginModal />}
    </Modal>
  );
};
