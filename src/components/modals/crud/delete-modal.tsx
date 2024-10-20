import { FC, useContext } from 'react';
import styled from 'styled-components';
import { Task } from '../../../store/task-slice';

import { ModalsContext } from '../../../../pages/_app';

import { StButton } from '../../form/styles';

import { Text, Title, Wrapper } from '../styles';

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
`;

interface DeleteModalInterface {
  editingTask: Task;
  confirmDeleteTask: () => void;
}

export const DeleteModal: FC<DeleteModalInterface> = ({
  editingTask,
  confirmDeleteTask,
}) => {
  const { closeModal } = useContext(ModalsContext);

  return (
    <Wrapper>
      <Title>Удалить задачу?</Title>
      <Text>Вы уверены, что хотите удалить задачу "{editingTask.title}"?</Text>
      <Block>
        <StButton onClick={confirmDeleteTask}>Удалить</StButton>
        <StButton onClick={closeModal}>Отмена</StButton>
      </Block>
    </Wrapper>
  );
};
