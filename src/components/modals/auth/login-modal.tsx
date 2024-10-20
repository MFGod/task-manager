import { FC } from 'react';

import { LoginForm } from '../../form/auth/login-form';

import { Title, Wrapper } from '../styles';

export const LoginModal: FC = () => {
  return (
    <Wrapper>
      <Title>Авторизация</Title>
      <LoginForm />
    </Wrapper>
  );
};
