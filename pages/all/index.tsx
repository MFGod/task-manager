import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Board } from '../../src/components/board';

import { StButton } from '../../src/components/form/styles';

const Wrapper = styled.div`
  margin: 20px 40px;
`;

const AllPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/');
  };

  return (
    <Wrapper>
      <DndProvider backend={HTML5Backend}>
        <StButton onClick={onLogout}>Выйти</StButton>
        <Board />
      </DndProvider>
    </Wrapper>
  );
};

export default AllPage;
