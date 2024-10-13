import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Column {
  userId?: string;
  id: string;
  title: string;
}

interface ColumnState {
  columns: Column[];
}

const initialState: ColumnState = {
  columns: [
    { id: 'todo', title: 'Нужно сделать' },
    { id: 'inProgress', title: 'В процессе' },
    { id: 'completed', title: 'Завершенные' },
  ],
};

export const columnIdMap: { [key: string]: number } = {
  todo: 1,
  inProgress: 2,
  completed: 3,
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<Column[]>) {
      state.columns = action.payload;
    },
    addColumn(state, action: PayloadAction<Column>) {
      const existingColumn = state.columns.find(
        (column) => column.id === action.payload.id
      );

      if (!existingColumn) {
        state.columns.push(action.payload);
      } else {
        console.warn(`Колонка с Id ${action.payload.id} уже существует.`);
      }
    },

    updateColumn(state, action: PayloadAction<Column>) {
      const { id, title } = action.payload;
      const column = state.columns.find((column) => column.id === id);
      if (column) {
        column.title = title;
      } else {
        console.warn(`Колонка с ${id} не найдена.`);
      }
    },
    deleteColumn(state, action: PayloadAction<string>) {
      state.columns = state.columns.filter(
        (column) => column.id !== action.payload
      );
    },
  },
});

export const { setColumns, addColumn, updateColumn, deleteColumn } =
  columnsSlice.actions;

export default columnsSlice.reducer;
