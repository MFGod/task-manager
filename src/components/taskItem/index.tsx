import { FC, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

import { List } from '../../../styles/styles';

import { StEditIcon } from '../../../public/assets/edit';
import { StDeleteIcon } from '../../../public/assets/delete';

import { calculateDaysLeft, formatDate } from '../../utils/dateUtils';

import { Task } from '../../store/taskSlice';

const StList = styled(List)<{ border: string }>`
  border-radius: 6px;
  outline: none;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: 1px solid ${({ border }) => border};

  &:hover {
    /*background-color: #4d380085;*/
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const TaskBlock = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 300px;

  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 26px;
`;

interface TaskItemProps {
  task: Task;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
}

export const TaskItem: FC<TaskItemProps> = ({
  task,
  onDelete,
  onEdit,
  onView,
}) => {
  const [{}, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, column: task.column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const daysLeft = calculateDaysLeft(task.dueDate || '');

  const borderColor = useMemo(() => {
    if (daysLeft <= 3) {
      return '#ff4d4d';
    } else if (daysLeft <= 7) {
      return '#ff9d00';
    } else {
      return 'transparent';
    }
  }, [daysLeft]);

  return (
    <StList ref={drag} border={borderColor}>
      <TaskBlock onClick={() => onView(task)}>
        <Title>{task.title}</Title>
        <p>{task.dueDate ? formatDate(task.dueDate) : ''} </p>
      </TaskBlock>
      <Wrapper>
        <StEditIcon
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
        >
          Редактировать
        </StEditIcon>
        <StDeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task);
          }}
        />
      </Wrapper>
    </StList>
  );
};
