import { FC } from 'react';
import styled from 'styled-components';

import { FilterType } from '../../../utils/taskUtils';

const FilterList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Item = styled.li<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 26px;

  color: #ff9d00;

  padding: 10px;

  background-color: ${({ isActive }) =>
    isActive ? '#4d380085' : 'transparent'};

  border: none;
  border-radius: 8px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  list-style: none;

  cursor: pointer;

  &:hover {
    background-color: #4d380085;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Number = styled.span`
  color: #d7d7d780;
`;

interface TaskFilterInterface {
  tasksCount: { [key: string]: number };
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TaskFilter: FC<TaskFilterInterface> = ({
  tasksCount,
  currentFilter,
  onFilterChange,
}) => {
  return (
    <FilterList>
      {Object.entries(tasksCount).map(([key, count]) => (
        <Item
          key={key}
          isActive={currentFilter === key}
          onClick={() => onFilterChange(key as FilterType)}
        >
          {key === 'recentlyAdded' && 'Недавно добавленные'}
          {key === 'today' && 'Сделать сегодня'}
          {key === 'week' && 'Сделать на неделе'}
          {key === 'all' && 'Все задачи'}
          <Number>{count}</Number>
        </Item>
      ))}
    </FilterList>
  );
};
