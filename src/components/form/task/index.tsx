import { FC, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Task } from '../../../store/task-slice';

import { getCurrentDate } from '../../../utils/date-utils';

import { Input, StButton, StForm, Wrapper } from '../styles';

const DateBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;

  padding: 0 10px;
  color: #ff9d00;
`;

interface TaskFormProps {
  onAdd: (task: Task) => void;
  editingTask?: Task | null;
  columnId: number;
}

export const TaskForm: FC<TaskFormProps> = ({
  onAdd,
  editingTask,
  columnId,
}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [complitedAt, setComplitedAt] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTaskTitle(editingTask.title);
      setTaskDescription(editingTask.description);
      setComplitedAt(editingTask.complitedAt || '');
    }
  }, [editingTask]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() !== '' && taskDescription.trim() !== '') {
      const newTask: Task = {
        userId: localStorage.getItem('userId') || '',
        id: editingTask?.id || Date.now(),
        title: taskTitle,
        description: taskDescription,
        columnId: columnId,
        createdAt: editingTask ? editingTask.createdAt : getCurrentDate(),
        complitedAt: complitedAt,
        completed: false,
        deleted: false,
      };
      onAdd(newTask);
    }
  };

  return (
    <StForm onSubmit={handleSubmit}>
      <Wrapper>
        <Input
          type="text"
          value={taskTitle}
          placeholder="Название задачи"
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <Input
          type="text"
          value={taskDescription}
          placeholder="Описание"
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <DateBlock>
          <Label>Срок завершения:</Label>
          <Input
            type="date"
            value={complitedAt}
            placeholder="Cрок завершения"
            onChange={(e) => setComplitedAt(e.target.value)}
          />
        </DateBlock>
      </Wrapper>

      <StButton type="submit">
        {editingTask ? 'Сохранить изменения' : 'Создать'}
      </StButton>
    </StForm>
  );
};
