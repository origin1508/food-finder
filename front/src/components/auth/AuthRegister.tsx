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

const AuthRegisterWrapper = styled.div`
  ${(props) => props.theme.mixins.flexBox}

  width: 100%;
  height: 100%;
`;

const AuthRegisterContainer = styled.div`
  ${(props) => props.theme.mixins.flexBox('column')}

  width: 60rem;
  height: 75rem;
  padding: ${(props) => props.theme.spacingLarge};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px ${(props) => props.theme.lightDarkGrey};
  background-color: ${(props) => props.theme.mainWhite};
`;
