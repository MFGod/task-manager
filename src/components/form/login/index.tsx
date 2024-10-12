import { FC, useContext } from 'react';
import styled from 'styled-components';

import { useLogin } from '../../../hooks/useLogin';

import { ModalsContext } from '../../../../pages/_app';

import { ErrorMessage, Input, StButton, StForm, Wrapper } from '../styles';

const ButtonsBlock = styled.div`
  display: flex;
  align-self: center;
  gap: 20px;
`;

export const LoginForm: FC = () => {
  const { emailLogin, setEmailLogin, password, setPassword, error, handleSubmit } =
    useLogin();
  const { closeModal } = useContext(ModalsContext);

  return (
    <StForm onSubmit={handleSubmit}>
      <Wrapper>
        <Input
          type="email"
          value={emailLogin}
          onChange={(e) => setEmailLogin(e.target.value)}
          placeholder="Email"
          required
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </Wrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonsBlock>
        <StButton type="submit">Войти</StButton>
        <StButton type="button" onClick={closeModal}>
          Отмена
        </StButton>
      </ButtonsBlock>
    </StForm>
  );
};
