import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { isLoginSelector, authState } from '../atom/auth';
import styled from 'styled-components';
import CurrentUserProfile from '../components/profile/CurrentUserProfile';
import UserProfile from '../components/profile/UserProfile';
import LikedRestaurant from '../components/profile/LikedRestaurant';
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
        {/* <LikedRestaurant /> */}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.article`
  width: 100%;
  height: 100vh;
  padding-top: 8vh;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 40% auto;
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  gap: ${({ theme }) => `0 ${theme.spacingLargest}`};
  padding: 0 10%;
  width: 100%;
  height: 200%;
`;

export default Profile;
