import styled from 'styled-components';

import CurrentUserProfile from '../components/profile/CurrentUserProfile';
import LikedRestaurant from '../components/profile/LikedRestaurant';
import UserRecipe from '../components/profile/UserRecipe';
const Profile = () => {
  return (
    <Container>
      <ContentContainer>
        <CurrentUserProfile></CurrentUserProfile>
        <UserRecipe></UserRecipe>
        <LikedRestaurant />
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
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  padding: 0 8%;
  width: 100%;
  height: 200%;
`;

export default Profile;
