import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  AuthButton,
  AuthButtonContainer,
  AuthInput,
  AuthInputContainer,
} from '../../styles/authStyle';

const AuthLoginForm = () => {
  return (
    <AuthLoginFormContainer>
      <AuthInputContainer>
        <AuthInput placeholder="E-mail" type="email" />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput placeholder="Password" type="password" />
      </AuthInputContainer>
      <AuthButtonContainer>
        <AuthButton>Login</AuthButton>
        <AuthLink to="/register">Sign up</AuthLink>
      </AuthButtonContainer>
    </AuthLoginFormContainer>
  );
};

export default AuthLoginForm;

const AuthLoginFormContainer = styled.form`
  ${(props) => props.theme.mixins.flexBox('column')}

  width: 90%;
  height: 100%;
`;

const AuthLink = styled(Link)`
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  color: #2e83f5;
  cursor: pointer;
`;
