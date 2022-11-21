import styled from 'styled-components';

const AuthRegisterForm = () => {
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
      <AuthButtonConatiner>
        <AuthButton>Registration</AuthButton>
        <AuthLink href="/login">Sign in</AuthLink>
      </AuthButtonConatiner>
    </AuthRegisterFormContainer>
  );
};

export default AuthRegisterForm;

const AuthRegisterFormContainer = styled.form`
  ${(props) => props.theme.mixins.flexBox('column')}

  width: 90%;
  height: 100%;
`;

const AuthInputContainer = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacingMedium};
`;

const AuthInput = styled.input`
  width: 100%;
  height: 5.5rem;
  font-size: 1.5rem;
  padding: ${(props) => props.theme.spacingSemiMedium};
  margin-bottom: ${(props) => props.theme.spacingRegular};
  border: none;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px ${(props) => props.theme.lightDarkGrey};
`;

const AuthButtonConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 15rem;
`;

const AuthButton = styled.button`
  width: 100%;
  height: 5.5rem;
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacingSemiMedium};
  border-radius: 0.5rem;
  background-color: #2e83f5;
  color: ${(props) => props.theme.mainWhite};

  &:active {
    transform: scale(0.98);
  }
`;

const AuthLink = styled.a`
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  color: #2e83f5;
  cursor: pointer;
`;
