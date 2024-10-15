import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { StDeleteColumn } from '../../../public/assets/deleteColumn';

import { PROTECTED_TITLES } from '../../store/columnSlice';
import { moveTask, Task } from '../../store/taskSlice';

import TaskList from '../taskList';

const Wrapper = styled.li`
  position: relative;
  min-height: 100px;
  min-width: 360px;
  padding: 16px;

  border-radius: 6px;

  background-color: #73737390;

  list-style: none;
`;

const TitleInput = styled.input`
  font-size: 20px;

  padding: 4px 8px;
  margin: 0 0 10px 0;

  border-radius: 6px;

  color: #ff9d00;
  background-color: transparent;

  border: none;
  :focus {
    background-color: #60606065;
  }
`;

interface ColumnProps {
  title: string;
  tasks: Task[];
  id: string;
  onEditTitle: (newTitle: string) => void;
  onDelete: () => void;
}

const Column: FC<ColumnProps> = ({
  title,
  tasks,
  id,
  onEditTitle,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const [{}, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string; column: string }) => {
      if (item.column !== id) {
        dispatch(
          moveTask({ taskId: item.id, source: item.column, destination: id })
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });



  return (
    <Wrapper ref={drop}>
      {!PROTECTED_TITLES.includes(title) && (
        <StDeleteColumn onClick={onDelete}>Удалить</StDeleteColumn>
      )}
      <TitleInput
        type="text"
        defaultValue={title}
        onBlur={(e) => onEditTitle(e.target.value)}
      />

      <TaskList tasks={tasks} columnId={id} />
    </Wrapper>
  );
};

export default Column;
