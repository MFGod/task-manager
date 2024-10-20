import { ErrorMessage, Input, StButton, StForm, Wrapper } from '../styles';

import { useRegistration } from '../../../hooks/useRegistration';

export const RegistrationForm = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  } = useRegistration();

  return (
    <StForm onSubmit={handleSubmit}>
      <Wrapper>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Wrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <StButton type="submit">Зарегистрироваться</StButton>
    </StForm>
  );
};
