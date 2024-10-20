// Импортируем необходимые функции и типы из Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCurrentDate } from '../utils/date-utils';

export interface Task {
  userId: string;
  id: number;
  title: string;
  description: string;
  columnId: number;
  createdAt: string;
  complitedAt?: string;
  completed: boolean;
  inProgress?: boolean;
  deleted: boolean;
}

interface TasksState {
  tasks: Task[];
}

interface MoveTaskPayload {
  taskId: number;
  source: string;
  destination: number;
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },

    addTask(
      state,
      action: PayloadAction<Omit<Task, 'userId' | 'createdDate'>>
    ) {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.warn(
          'Предупреждение: userId не найден в localStorage. Задача не будет добавлена.'
        );
        return;
      }

      const newTask: Task = {
        ...action.payload,
        userId,
        columnId: action.payload.columnId,
        createdAt: getCurrentDate(),
      };

      state.tasks = state.tasks.concat(newTask);
    },

    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateTask(state, action: PayloadAction<Task>) {
      const task = state.tasks.find(
        (task) =>
          task.id === action.payload.id && task.userId === action.payload.userId
      );
      if (task) {
        Object.assign(task, action.payload); // Прямое обновление объекта задачи
      }
    },

    moveTask(state, action: PayloadAction<MoveTaskPayload>) {
      const { taskId, destination } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);

      if (!task) {
        console.warn(`Задача с Id ${taskId} не найдена!.`);
        return;
      }

      // Обновляем значения задачи
      task.columnId = destination;
      task.inProgress = destination === 2;
      task.completed = destination === 3;

      console.log(`Задача ${taskId} перемещена в ${destination}`);
    },
  },
});

export const { setTasks, addTask, deleteTask, updateTask, moveTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
