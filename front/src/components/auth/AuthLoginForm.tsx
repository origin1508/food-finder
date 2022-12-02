import { useForm } from 'react-hook-form';
import { AuthFormInitial } from '../../types/auth';
import useSetAlert from '../../hooks/useSetAlert';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  AuthButton,
  AuthButtonContainer,
  AuthInput,
  AuthInputContainer,
  ErrorMessage,
} from '../../styles/authStyle';
import useLogin from '../../hooks/useLogin';
import { PATH } from '../../customRouter';

const AuthLoginForm = () => {
  const { mutate: signup, isLoading } = useLogin();
  const { setAlertLoading } = useSetAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInitial>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((loginForm) => {
    if (isLoading) {
      setAlertLoading({ loading: true });
    }
    signup(loginForm);
  });

  return (
    <AuthLoginFormContainer onSubmit={onSubmit}>
      <AuthInputContainer>
        <AuthInput
          placeholder="E-mail"
          type="email"
          {...register('email', { required: '이메일은 필수입니다.' })}
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput
          placeholder="Password"
          type="password"
          {...register('password', { required: '비밀번호는 필수입니다.' })}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
      </AuthInputContainer>
      <AuthButtonContainer>
        <AuthButton type="submit">Login</AuthButton>
        <AuthLink to={PATH.REGISTER}>Sign up</AuthLink>
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
