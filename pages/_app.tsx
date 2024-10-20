import { createContext, useState } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

import { GlobalStyles } from '../styles/global-styles';

import { ModalComponent } from '../src/components/modals';

import store from '../src/store/store';
import { Task } from '../src/store/task-slice';

interface ModalsContextInterface {
  isModalOpen: boolean;
  modalMode:
    | 'view'
    | 'edit'
    | 'add'
    | 'confirmDelete'
    | 'registration'
    | 'login';
  openModal: (
    mode: 'view' | 'edit' | 'add' | 'confirmDelete' | 'registration' | 'login',
    task?: Task | null,
    onConfirm?: (id: number) => void
  ) => void;
  closeModal: () => void;
  editingTask: Task | null;
  confirmDeleteTaskId: number | null;
}

export const ModalsContext = createContext<ModalsContextInterface>({
  isModalOpen: false,
  modalMode: 'add',
  openModal: () => {},
  closeModal: () => {},
  editingTask: null,
  confirmDeleteTaskId: null,
});

function CustomApp({ Component, pageProps }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    'view' | 'edit' | 'add' | 'confirmDelete' | 'registration' | 'login'
  >('add');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [confirmDeleteTaskId, setConfirmDeleteTaskId] = useState<number | null>(
    null
  );

  const openModal = (
    mode: 'view' | 'edit' | 'add' | 'confirmDelete' | 'registration' | 'login',
    task?: Task | null
  ) => {
    setModalMode(mode);
    setEditingTask(task || null);
    setIsModalOpen(true);
    if (mode === 'confirmDelete' && task) {
      setConfirmDeleteTaskId(task.id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMode('add');
    setEditingTask(null);
    setConfirmDeleteTaskId(null); // Сбрасываем ID при закрытии
  };

  return (
    <Provider store={store}>
      <ModalsContext.Provider
        value={{
          isModalOpen,
          modalMode,
          openModal,
          closeModal,
          editingTask,
          confirmDeleteTaskId,
        }}
      >
        <GlobalStyles />

        <Component {...pageProps} />

        <ModalComponent />
      </ModalsContext.Provider>
    </Provider>
  );
}

export default CustomApp;
