import { useForm } from 'react-hook-form';
import { UserInfoEdit } from '../../types/user';
import { AuthFormInitial } from '../../types/auth';
import styled from 'styled-components';
import useEditPassword from '../../hooks/Auth/useEditPassword';

const PasswordEditForm = ({
  setIsPasswordEditing,
  setAlertLoading,
  user,
}: UserInfoEdit) => {
  const { mutate: editPassword, isLoading } = useEditPassword();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AuthFormInitial>({
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async (passwordForm) => {
    delete passwordForm.confirmPassword;
    if (isLoading) {
      setAlertLoading({ loading: true });
    }
    editPassword(passwordForm);
  });
  return (
    <UserInfoUpdateForm onSubmit={onSubmit}>
      <Label htmlFor="password">Change Password</Label>
      <InputContainer>
        <Input
          type="password"
          placeholder="현재 비밀번호"
          {...register('password', {
            required: '현재 비밀번호를 입력해주세요!',
            minLength: {
              value: 8,
              message: '비밀번호는 8글자 이상입니다.',
            },
          })}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
      </InputContainer>
      <InputContainer>
        <Input
          type="password"
          placeholder="새로운 비밀번호"
          {...register('newPassword', {
            required: '새로운 비밀번호를 입력해주세요!',
            pattern: {
              value:
                /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
              message: ' 8~15자 영문 소문자, 숫자, 특수문자를 사용해주세요.',
            },
          })}
        />
        <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
      </InputContainer>
      <InputContainer>
        <Input
          type="password"
          placeholder="새로운 비밀번호 확인"
          {...register('confirmPassword', {
            required: '비밀번호가 일치하지 않습니다!',
            validate: {
              cofirmNewPassword: (value) => {
                const { newPassword } = getValues();
                return newPassword === value || '비밀번호가 일치하지 않습니다!';
              },
            },
          })}
        />
        <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
      </InputContainer>
      <Button type="submit">Change</Button>
      <Button
        type="button"
        onClick={() => {
          setIsPasswordEditing((prev) => !prev);
        }}
      >
        Cancel
      </Button>
    </UserInfoUpdateForm>
  );
};
const UserInfoUpdateForm = styled.form`
  ${({ theme }) => theme.mixins.flexBox('column', 'center', 'space-between')}
  height:100%;
  padding: 2rem 0;
`;
const InputContainer = styled.div`
  position: relative;
  ${({ theme }) => theme.mixins.flexBox}
  width: 100%;
`;

const Label = styled.label`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontRegular,
      theme.weightSemiBold,
      theme.mainBlack,
    )}
`;
const Input = styled.input`
  ${({ theme }) => theme.mixins.input}
  width:60%;
`;

const Button = styled.button`
  ${({ theme }) => theme.mixins.mediumButton()}
  width: 60%;
`;
const ErrorMessage = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: -1.5rem;
  font-size: ${({ theme }) => theme.fontSmall};
  color: ${({ theme }) => theme.lightRed};
  height: 1.4rem;
`;

export default PasswordEditForm;
