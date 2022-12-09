import { useForm } from 'react-hook-form';
import { AuthFormInitial } from '../../types/auth';
import useEditNickname from '../../hooks/Auth/useEditNickname';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { UserInfoEdit } from '../../types/user';

const NicknameEditFrom = ({
  setIsPasswordEditing,
  setAlertLoading,
  user,
  errors,
  register,
  onSubmit,
}: UserInfoEdit) => {
  return (
    <UserInfoUpdateForm onSubmit={onSubmit}>
      <Label htmlFor="name">Name</Label>
      <InputContainer>
        <Input
          type="text"
          placeholder="Your Name"
          defaultValue={user?.nickname!}
          {...register!('nickname', {
            minLength: {
              value: 3,
              message: '닉네임을 세글자 이상 입력하세요!',
            },
          })}
        />
        <ErrorMessage>{errors!.nickname?.message}</ErrorMessage>
      </InputContainer>
      <Button type="submit">Update</Button>
      <Button
        type="button"
        onClick={() => {
          setIsPasswordEditing((prev) => !prev);
        }}
      >
        Change Password
      </Button>
    </UserInfoUpdateForm>
  );
};
const UserInfoUpdateForm = styled.form`
  ${({ theme }) => theme.mixins.flexBox('column', 'center', 'space-around')}
  width: 100%;
  height: 40%;
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

export default NicknameEditFrom;
