import styled from 'styled-components';
import { RestaurantInfoCardProps } from '../../types/restaurant/restaurantType';
import favoriteMarkerImage from '../../assets/favoriteMarker2.png';

const RestaurantInfoCard = ({
  title,
  address,
  road_address,
}: RestaurantInfoCardProps) => {
  return (
    <RestaurantInfoContainer>
      <Marker src={favoriteMarkerImage}></Marker>
      <RestaurantInfo>
        <RestaurntName>{title}</RestaurntName>
        <RestaurntAddress>{road_address}</RestaurntAddress>
        <RestaurntSubAddress>{address}</RestaurntSubAddress>
        {/* <RestaurntTelNumber>02-473-7704</RestaurntTelNumber> */}
      </RestaurantInfo>
    </RestaurantInfoContainer>
  );
};

export default RestaurantInfoCard;

const RestaurantInfoContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
`;

const RestaurantInfo = styled.div`
  width: 100%;
`;

const Marker = styled.img`
  flex-shrink: 0;
  width: 6rem;
  height: 6rem;
  background-image: url(${favoriteMarkerImage});
`;

const RestaurntName = styled.p`
  font-weight: ${({ theme }) => theme.weightSemiBold};
`;

const RestaurntAddress = styled.p``;

const RestaurntSubAddress = styled.p`
  color: ${({ theme }) => theme.darkGrey};
`;

const RestaurntTelNumber = styled.p`
  color: ${({ theme }) => theme.themeColor};
`;
