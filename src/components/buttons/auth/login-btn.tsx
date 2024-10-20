import { FC } from 'react';
import styled from 'styled-components';

const StButton = styled.button`
  display: flex;
  align-items: center;
  gap: 20px;

  font-size: 30px;
  padding: 10px;

  color: #ff9d00;
  background-color: transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: #4d380085;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface LoginButtonInterface {
  onClick: () => void;
}

export const LoginButton: FC<LoginButtonInterface> = ({ onClick }) => {
  return <StButton onClick={onClick}>Авторизация</StButton>;
};
