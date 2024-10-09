import { Task } from '../store/taskSlice';

import { calculateDaysLeft } from './dateUtils';

export type FilterType = 'recentlyAdded' | 'today' | 'week' | 'all';

const filterByDate = (tasks: Task[], filter: FilterType): Task[] => {
  return tasks.filter((task) => {
    const daysLeft = task.dueDate ? calculateDaysLeft(task.dueDate) : Infinity;
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

// Функция фильтрации задач по колонке и фильтру
export const filterTasksByColumn = (
  tasks: Task[],
  filter: FilterType,
  columnId: string
): Task[] => {
  // Фильтрация по колонке
  const tasksInColumn = tasks.filter((task) => task.column === columnId);

  // Применение фильтра по дате и другим критериям
  return filterTaskByFilter(tasksInColumn, filter);
};
