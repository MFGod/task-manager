import React, { FC, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { StAddColumn } from '../../../public/assets/addColumn';

import { useBoardData } from '../../hooks/useBoardData';

import { useAppSelector } from '../../store/hooks';

import {
  addColumn,
  IColumn,
  deleteColumn,
  updateColumn,
} from '../../store/column-slice';

import { filterTaskByFilter, FilterType } from '../../utils/task-utils';

import {
  addColumnService,
  deleteColumnService,
} from '../../services/column-service';

import { TaskFilter } from './filter';
import Column from '../column';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: nowrap;

  overflow-x: auto;
  overflow-y: hidden;
  height: calc(100vh - 40px);

  /* Стилизация скролла */
  ::-webkit-scrollbar {
    width: 12px; /* Ширина вертикального скроллбара */
    height: 12px; /* Высота горизонтального скроллбара */
  }

  ::-webkit-scrollbar-track {
    background: #ffc96b46; /* Цвет фона скроллбара */
    border-radius: 10px; /* Закругление углов трека */
    margin: 0 60px 4px 60px; /* Добавим отступ снизу к треку */
  }

  ::-webkit-scrollbar-thumb {
    background: #e97230; /* Цвет ползунка */
    border-radius: 10px; /* Закругление углов ползунка */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #e97230;
  }
`;

export const Board: FC = () => {
  const dispatch = useDispatch();

  const tasks = useAppSelector((state) => state.tasks.tasks);
  const columns = useAppSelector((state) => state.columns.columns);

  console.log(columns);

  const [columnTitle, setColumnTitle] = useState('Название');
  const [filter, setFilter] = useState<FilterType>('all');

  const { loadColumnById } = useBoardData();

  const handleAddColumn = async () => {
    if (columnTitle.trim()) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        console.error('Необходим токен и userId для добавления колонки.');
        return; // Выход из функции, если токен или userId отсутствуют
      }

      const newColumn: Omit<IColumn, 'id'> = {
        title: columnTitle,
      };

      try {
        const createdColumn = await addColumnService(token, userId, newColumn);
        dispatch(addColumn({ id: createdColumn.id, title: newColumn.title }));
        setColumnTitle('Название');
      } catch (error) {
        console.error('Ошибка при добавлении колонки:', error);
      }
    }
  };

  const handleChangeColumnTitle = (id: number, newTitle: string) => {
    dispatch(updateColumn({ id, title: newTitle }));
  };

  const handleDeleteColumn = async (id: number, title: string) => {
    console.log('Удаление колонки с id:', id, 'и заголовком:', title); // Логирование id

    const token = localStorage.getItem('token');

    const taskColumnId = id;

    if (!token || !taskColumnId) {
      console.error(
        'Необходим токен и корректный taskColumnId для удаления колонки.'
      );
      return;
    }

    try {
      await deleteColumnService(token, taskColumnId);

      dispatch(deleteColumn(id));
    } catch (error) {
      console.error('Ошибка при удалении колонки:', error);
    }
  };

  // Подсчет задач для каждого фильтра
  const tasksCount = useMemo(
    () => ({
      recentlyAdded: filterTaskByFilter(tasks, 'recentlyAdded').length,
      today: filterTaskByFilter(tasks, 'today').length,
      week: filterTaskByFilter(tasks, 'week').length,
      all: filterTaskByFilter(tasks, 'all').length,
    }),
    [tasks]
  );

  return (
    <Wrapper>
      <TaskFilter
        tasksCount={tasksCount}
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      <List>
        {columns.map(({ id, title }) => {
          // Фильтруем задачи по текущей колонке, используя columnId
          const filteredTasks = tasks.filter((task) => task.columnId === id);

          // Логирование задач для текущей колонки
          console.log(
            `Задачи в колонке "${title}" (ID: ${id}):`,
            filteredTasks
          );

          return (
            <Column
              key={id}
              id={id}
              title={title}
              tasks={filteredTasks} // Передаем отфильтрованные задачи
              onEditTitle={(newTitle) => handleChangeColumnTitle(id, newTitle)}
              onDelete={() => handleDeleteColumn(id, title)}
            />
          );
        })}
        <StAddColumn onClick={handleAddColumn} />
      </List>
    </Wrapper>
  );
};
