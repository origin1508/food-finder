import styled from 'styled-components';
import UserLikedRestaurant from '../components/profile/UserLikedRestaurant';

const LikedRestaurant = () => {
  return (
    <RestaurantContainer>
      <UserLikedRestaurant />
    </RestaurantContainer>
  );
};

export default LikedRestaurant;

const RestaurantContainer = styled.article`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: 100vh;
  padding-top: 7rem;
`;
