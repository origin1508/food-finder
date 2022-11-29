import styled from 'styled-components';

import CurrentUserProfile from '../components/profile/CurrentUserProfile';
import UserRecipe from '../components/profile/UserRecipe';
const Profile = () => {
  return (
    <Container>
      <ContentContainer>
        <CurrentUserProfile></CurrentUserProfile>
        <UserRecipe></UserRecipe>
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
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-around')}
  padding: 0 8%;
  width: 100%;
  height: 100%;
  gap: ${({ theme }) => theme.spancingLarge};
  margin: ${({ theme }) => `${theme.spancingMedium} 0`};
`;

export default Profile;
