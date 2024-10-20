import { FC, useContext } from 'react';
import styled from 'styled-components';

import { ModalsContext } from '../../../pages/_app';

import { Task } from '../../store/task-slice';

import { AddTaskButton } from '../buttons/addTask';

import { TaskItem } from './task-item';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Text = styled.p`
  color: #ffffff;
`;

interface TaskListInterface {
  tasks: Task[];
  columnTitle: string;
  columnId: number;
}

const TaskList: FC<TaskListInterface> = ({ tasks, columnId }) => {
  const { openModal } = useContext(ModalsContext);

  const handleEditTask = (task: Task) => {
    openModal('edit', task);
  };

  const handleViewTask = (task: Task) => {
    openModal('view', task);
  };

  const handleDeleteTaskRequest = (task: Task) => {
    openModal('confirmDelete', task);
  };

  return (
    <Wrapper>
      {tasks.length > 0 ? (
        tasks.map((task) => {
          console.log(`Rendering task with id: ${task.id}`);
          return (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTaskRequest}
              onEdit={handleEditTask}
              onView={handleViewTask}
            />
          );
        })
      ) : (
        <Text>Нет задач для отображения.</Text>
      )}

      <AddTaskButton columnId={columnId} />
    </Wrapper>
  );
};

export default TaskList;
