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
    const accessTokenString = localStorage.getItem('accessTokenString');
    if (!accessTokenString) {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessTokenString');
    localStorage.removeItem('userId');

    router.push('/');
  };

  return (
    <Wrapper>
      <DndProvider backend={HTML5Backend}>
        <StButton onClick={handleLogout}>Выйти</StButton>
        <Board />
      </DndProvider>
    </Wrapper>
  );
};

export default AllPage;
