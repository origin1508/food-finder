import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { isLoginSelector, authState } from '../atom/auth';
import styled from 'styled-components';
import CurrentUserProfile from '../components/profile/CurrentUserProfile';
import UserProfile from '../components/profile/UserProfile';
import UserRecipe from '../components/profile/UserRecipe';
import { PATH } from '../customRouter';

const Profile = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  const user = useRecoilValue(authState);
  const navigate = useNavigate();
  const { userId: profileOwnerId } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if (!isLogin) {
      navigate(PATH.LOGIN);
    }
    if (profileOwnerId == user?.userId) {
      setIsOwner(true);
    }
    console.log(profileOwnerId);
  }, [isLogin, profileOwnerId]);

  return (
    <Container>
      <ContentContainer>
        {isOwner ? (
          <CurrentUserProfile />
        ) : (
          <UserProfile profileOwnerId={profileOwnerId!} />
        )}
        <UserRecipe profileOwnerId={profileOwnerId!} />
      </ContentContainer>
    </Container>
  );
};

const Container = styled.article`
  ${({ theme }) => theme.mixins.flexBox()}
  height: 100vh;
  padding-top: 4vh;
`;

const ContentContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  gap: ${({ theme }) => `0 ${theme.spacingLargest}`};
`;

export default Profile;
