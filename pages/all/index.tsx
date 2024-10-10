import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

import { Board } from '../../src/components/board';
import { useRouter } from 'next/router';

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
  }, []);
  
  return (
    <Wrapper>
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </Wrapper>
  );
};

export default AllPage;
