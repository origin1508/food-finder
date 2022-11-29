import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  AuthButton,
  AuthButtonContainer,
  AuthInput,
  AuthInputContainer,
} from '../../styles/authStyle';

const AuthRegisterForm = () => {
  const LOGIN_PATH = '/login';
  return (
    <AuthRegisterFormContainer>
      <AuthInputContainer>
        <AuthInput placeholder="Your Name" />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput placeholder="E-mail" type="email" />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput placeholder="Password" type="password" />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput placeholder="Confirm Password" type="password" />
      </AuthInputContainer>
      <AuthButtonContainer>
        <AuthButton>Registration</AuthButton>
        <AuthLink to={LOGIN_PATH}>Sign in</AuthLink>
      </AuthButtonContainer>
    </AuthRegisterFormContainer>
  );
};

export default AuthRegisterForm;

const AuthRegisterFormContainer = styled.form`
  ${(props) => props.theme.mixins.flexBox('column')}
  width: 90%;
  height: 100%;
`;

const AuthLink = styled(Link)`
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  color: ${({ theme }) => theme.themeColor};
  cursor: pointer;
`;
