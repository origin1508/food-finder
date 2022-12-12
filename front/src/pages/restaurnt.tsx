import styled from 'styled-components';
import LikedRestaurant from '../components/profile/LikedRestaurant';

const Restaurant = () => {
  return (
    <RestaurantContainer>
      <LikedRestaurant />
    </RestaurantContainer>
  );
};

export default Restaurant;

const RestaurantContainer = styled.article`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: 100vh;
  padding-top: 7rem;
`;
