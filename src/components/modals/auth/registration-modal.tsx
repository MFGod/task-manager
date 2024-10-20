import { RegistrationForm } from '../../form/auth/registration-form';

import { Title, Wrapper } from '../styles';

export const RegistrationModal = () => {
  return (
    <Wrapper>
      <Title>Регистрация</Title>
      <RegistrationForm />
    </Wrapper>
  );
};
