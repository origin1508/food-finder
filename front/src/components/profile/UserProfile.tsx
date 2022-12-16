import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuthInfo from '../../hooks/Auth/useAuthInfo';
import {
  RecipeDetailHeader,
  RecipeDetailTitleStyle,
  RecipeDetailSubTitleStyle,
} from '../../styles/recipeDetailStyle';

const UserProfile = ({ profileOwnerId }: { profileOwnerId: string }) => {
  const [user, setUser] = useState({
    userId: 1,
    email: '',
    nickname: '',
    profileUrl: '',
  });
  const { data } = useAuthInfo(profileOwnerId);

  useEffect(() => {
    setUser((prev) => {
      return { ...prev, ...data };
    });
  }, [profileOwnerId]);

  return (
    <ProfileCardContainer>
      <ProfileUserHeader>
        <Title>User Info</Title>
        <SubTitle>유저 정보</SubTitle>
      </ProfileUserHeader>
      <UserInfoContainer>
        <Text>Welcome to my profile</Text>
        <UserImgContainer>
          <UserImg src={user?.profileUrl} alt="userImg" />
        </UserImgContainer>
        <Name>{user?.nickname}</Name>
        <Email>{user?.email}</Email>
      </UserInfoContainer>
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

  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    height: 70vh;
  }
  @media (max-width: ${({ theme }) => theme.bpSmallest}) {
    width: 50vh;
    height: 50vh;
  }
`;
const ProfileUserHeader = styled.div`
  ${RecipeDetailHeader}
`;

const Title = styled.h3`
  ${RecipeDetailTitleStyle}
`;

const SubTitle = styled.h5`
  ${RecipeDetailSubTitleStyle}
`;
const Text = styled.p`
  ${({ theme }) =>
    theme.mixins.title(theme.fontMedium, theme.weightSemiBold, theme.mainBlack)}
  line-height: 1.7;
`;

const UserInfoContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  height: 70%;
  padding: 2rem 0;
  width: 100%;
  gap: ${({ theme }) => theme.spacingLarge};
`;

const UserImgContainer = styled.div`
  width: 15rem;
  height: 15rem;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
  border: 1px solid #ddd;
  cursor: pointer;
`;
const UserImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Name = styled.h5`
  ${({ theme }) =>
    theme.mixins.title(theme.fontRegular, theme.weightRegular, theme.mainBlack)}
`;
const Email = styled.span`
  ${({ theme }) =>
    theme.mixins.title(theme.fontRegular, theme.weightRegular, theme.darkGrey)}
`;

export default UserProfile;
