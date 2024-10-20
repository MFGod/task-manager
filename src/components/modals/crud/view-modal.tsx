import { FC } from 'react';
import styled from 'styled-components';

import { Task } from '../../../store/task-slice';

import { formatDate } from '../../../utils/date-utils';

import { Text, Title, Wrapper } from '../styles';

const StBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

interface ViewModalInterface {
  editingTask: Task;
}

export const ViewModal: FC<ViewModalInterface> = ({ editingTask }) => {
  return (
    <Wrapper>
      <Title>{editingTask.title}</Title>
      <StBlock>
        <Text>
          <strong>Описание:</strong> {editingTask.description}
        </Text>
        <Text>
          <strong>Дата добавления:</strong> {editingTask.createdAt}
        </Text>
        <Text>
          <strong>Срок завершения:</strong>
          {editingTask.complitedAt
            ? formatDate(editingTask.complitedAt)
            : 'Не установлен'}
        </Text>
      </StBlock>
    </Wrapper>
  );
};
