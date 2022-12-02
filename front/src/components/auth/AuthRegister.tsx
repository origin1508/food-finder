import styled from 'styled-components';
import AuthHeader from './AuthHeader';
import AuthRegisterForm from './AuthRegisterForm';

const AuthRegister = () => {
  return (
    <AuthRegisterWrapper>
      <AuthRegisterContainer>
        <AuthHeader>Register</AuthHeader>
        <AuthRegisterForm />
      </AuthRegisterContainer>
    </AuthRegisterWrapper>
  );
};

export default AuthRegister;

const AuthRegisterWrapper = styled.article`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: calc(100vh - 7rem);
`;

const AuthRegisterContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 60rem;
  height: 65rem;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
  background-color: ${({ theme }) => theme.mainWhite};
`;
