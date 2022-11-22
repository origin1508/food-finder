import styled from 'styled-components';
import AuthHeader from './AuthHeader';
import AuthLoginForm from './AuthLoginForm';

const AuthLogin = () => {
  return (
    <AuthLoginWrapper>
      <AuthLoginContainer>
        <AuthHeader>Login</AuthHeader>
        <AuthLoginForm />
      </AuthLoginContainer>
    </AuthLoginWrapper>
  );
};

export default AuthLogin;

const AuthLoginWrapper = styled.div`
  ${(props) => props.theme.mixins.flexBox}

  width: 100%;
  height: 100%;
`;

const AuthLoginContainer = styled.div`
  ${(props) => props.theme.mixins.flexBox('column')}

  width: 60rem;
  height: 55rem;
  padding: ${(props) => props.theme.spacingLarge};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px ${(props) => props.theme.lightDarkGrey};
  background-color: ${(props) => props.theme.mainWhite};
`;
