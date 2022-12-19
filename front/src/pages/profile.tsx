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
  if (profileOwnerId === undefined) return null;
  useEffect(() => {
    if (!isLogin) {
      navigate(PATH.LOGIN);
    }
    if (Number(profileOwnerId) === user?.userId) {
      setIsOwner(true);
    }
  }, [isLogin, profileOwnerId]);

  return (
    <Container>
      <ContentContainer>
        {isOwner ? (
          <CurrentUserProfile />
        ) : (
          <UserProfile profileOwnerId={profileOwnerId} />
        )}
        <UserRecipe profileOwnerId={profileOwnerId} />
      </ContentContainer>
    </Container>
  );
};

const Container = styled.article`
  ${({ theme }) => theme.mixins.flexBox()}
  height: 100vh;
  padding-top: 4vh;
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    height: 100%;
    padding: 10vh 0 4vh 0;
  }
`;

const ContentContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  gap: ${({ theme }) => `0 ${theme.spacingLargest}`};

  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    ${({ theme }) => theme.mixins.flexBox('column')}
    gap: ${({ theme }) => `${theme.spacingLargest} 0`};
  }
`;

export default Profile;
