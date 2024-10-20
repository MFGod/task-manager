import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IColumn {
  userId?: string;
  id: number;
  title: string;
}

interface ColumnState {
  columns: IColumn[];
}

const initialState: ColumnState = {
  columns: [],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<IColumn[]>) {
      state.columns = action.payload;
    },
    addColumn(state, action: PayloadAction<IColumn>) {
      const existingColumn = state.columns.find(
        (column) => column.id === action.payload.id
      );

      if (!existingColumn) {
        state.columns.push(action.payload);
      } else {
        console.warn(`Колонка с Id ${action.payload.id} уже существует.`);
      }
    },

    updateColumn(state, action: PayloadAction<IColumn>) {
      const { id, title } = action.payload;
      const column = state.columns.find((column) => column.id === id);
      if (column) {
        column.title = title;
      } else {
        console.warn(`Колонка с ${id} не найдена.`);
      }
    },
    deleteColumn(state, action: PayloadAction<number>) {
      state.columns = state.columns.filter(
        (column) => column.id !== action.payload
      );
    },
  },
});

export const { setColumns, addColumn, updateColumn, deleteColumn } =
  columnsSlice.actions;

export default columnsSlice.reducer;
