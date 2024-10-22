import { Task } from '../store/task-slice';

import { calculateDaysLeft } from './date-utils';

export type FilterType = 'all' | 'recentlyAdded' | 'today' | 'week';

const filterByDate = (tasks: Task[], filter: FilterType): Task[] => {
  return tasks.filter((task) => {
    const daysLeft = task.complitedAt
      ? calculateDaysLeft(task.complitedAt)
      : Infinity;

    switch (filter) {
      case 'today':
        return daysLeft === 0;
      case 'week':
        return daysLeft <= 7;
      case 'all':
      default:
        return true;
    }
  });
};

// Функция фильтрации задач по выбранному фильтру
export const filterTaskByFilter = (
  tasks: Task[],
  filter: FilterType
): Task[] => {
  const filteredTasks = filterByDate(tasks, filter);

  return filter === 'recentlyAdded' ? filteredTasks.slice(-5) : filteredTasks;
};
