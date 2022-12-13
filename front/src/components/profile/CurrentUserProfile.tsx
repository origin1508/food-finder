import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NicknameEditFrom from './NicknameEditForm';
import PasswordEditForm from './PasswordEditForm';
import { imageResize } from '../../util/profileImageResizeUtil';
import styled from 'styled-components';
import CustomIcon from '../icons/CustomIcon';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atom/auth';
import { AuthFormInitial } from '../../types/auth';
import useEditNickname from '../../hooks/Auth/useEditNickname';
import useEditImg from '../../hooks/Auth/useEditImg';
import useSetAlert from '../../hooks/useSetAlert';
import {
  RecipeDetailHeader,
  RecipeDetailTitleStyle,
  RecipeDetailSubTitleStyle,
} from '../../styles/recipeDetailStyle';

const CurrentUserProfile = () => {
  const user = useRecoilValue(authState);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const { mutate: editNickname, isLoading: nicknameEditLoading } =
    useEditNickname();
  const { mutate: editImg, isLoading: ImgUpdateLoading } = useEditImg();
  const { setAlertLoading } = useSetAlert();
  const [profileimgPreview, setProfileImgPreview] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormInitial>({
    mode: 'onChange',
    defaultValues: {
      updateImgFile: [],
    },
  });
  const profileImg = watch('updateImgFile');

  if (user === null) return null;

  const onSubmit = handleSubmit(async ({ updateImgFile, nickname }) => {
    if (updateImgFile === undefined || nickname === undefined) return null;
    if (updateImgFile.length > 0) {
      if (ImgUpdateLoading) {
        setAlertLoading({ loading: true });
      }
      const file = updateImgFile[0];
      const copress = await imageResize(file);
      editImg(copress);
    }
    if (nickname !== user?.nickname) {
      if (nicknameEditLoading) {
        setAlertLoading({ loading: true });
      }
      editNickname(nickname);
    }
  });

  useEffect(() => {
    (async () => {
      if (profileImg && profileImg.length > 0) {
        const file = profileImg[0];
        const copress = await imageResize(file);
        setProfileImgPreview(URL.createObjectURL(copress));
      }
    })();
  }, [profileImg]);

  return (
    <ProfileCardContainer>
      <UserInfoContainer>
        <UserInfoHeader>
          <Title>User Info</Title>
          <SubTitle>유저 정보</SubTitle>
        </UserInfoHeader>
        <UserInfoMain>
          <UserImgContainer>
            <UserImg
              src={
                profileimgPreview !== '' ? profileimgPreview : user?.profileUrl
              }
              alt="userImg"
            />
            <ImgUpdateContainer>
              <CustomIcon name="upload" size="20" />
              <P>Change</P>
            </ImgUpdateContainer>
            <ImgUpdate type="file" {...register('updateImgFile')} />
          </UserImgContainer>
          <Name>{user?.nickname}</Name>
          <Email>{user?.email}</Email>
        </UserInfoMain>
      </UserInfoContainer>

      {!isPasswordEditing ? (
        <NicknameEditFrom
          user={user}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          setIsPasswordEditing={setIsPasswordEditing}
          setAlertLoading={setAlertLoading}
        />
      ) : null}
      {isPasswordEditing ? (
        <PasswordEditForm
          user={user}
          setIsPasswordEditing={setIsPasswordEditing}
          setAlertLoading={setAlertLoading}
        />
      ) : null}
    </ProfileCardContainer>
  );
};

const ProfileCardContainer = styled.section`
  width: 60vh;
  height: 80vh;
  background-color: ${({ theme }) => theme.mainWhite};
  border-radius: 1rem;
  border: 1px ${({ theme }) => theme.darkGrey};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const UserInfoContainer = styled.div`
  padding-top: 2rem;
`;

const UserInfoHeader = styled.div`
  ${RecipeDetailHeader}
`;
const UserInfoMain = styled.div`
  padding-top: 2rem;
  ${({ theme }) => theme.mixins.flexBox('column')}
`;
const Title = styled.h3`
  ${RecipeDetailTitleStyle}
`;

const SubTitle = styled.h5`
  ${RecipeDetailSubTitleStyle}
`;
const UserImgContainer = styled.div`
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacingSemiMedium};
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover span {
    bottom: 0%;
  }
`;
const UserImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;
const ImgUpdateContainer = styled.span`
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: 50%;
  text-align: center;
  color: black;
  transition: 0.3s ease-in-out;
  background: #fff5;
`;
const P = styled.p`
  font-weight: ${({ theme }) => theme.weightSemiBold};
`;

const ImgUpdate = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;
const Name = styled.h5`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontRegular,
      theme.weightRegular,
      theme.mainBlack,
      theme.spacingSemiMedium,
    )}
`;
const Email = styled.span`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontRegular,
      theme.weightRegular,
      theme.darkGrey,
      theme.spacingSemiMedium,
    )}
`;

export default CurrentUserProfile;
