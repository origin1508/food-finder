import { useEffect } from 'react';
import styled from 'styled-components';
import useKakaoMap from '../../hooks/useKakaoMap';
import useRestaurant from '../../hooks/useRestaurant';
import RestaurantInfoCard from './RestaurantInfoCard';
import CustomIcon from '../icons/CustomIcon';
import { MediumTitle } from '../../styles/commonStyle';

const LikedRestaurant = () => {
  const { kakaoMap, mapRef, setRestaurntBounds, addRestaurantMarker } =
    useKakaoMap();
  const { likedRestaurantQuery, restaurantUnlikeMutation } = useRestaurant();
  const restaurants = likedRestaurantQuery.data?.result;

  useEffect(() => {
    setRestaurntBounds(new kakao.maps.LatLngBounds());
    restaurants?.map((restaurant) => {
      const { map_x, map_y } = restaurant;
      addRestaurantMarker(map_x, map_y);
    });
  }, [kakaoMap, restaurants, setRestaurntBounds]);

  return (
    <LikedRestaurantWrapper>
      <LikedRestaurantContainer>
        <LikedRestaurantHeader>
          <LikedRestaurantTitle>Liked Restaurant</LikedRestaurantTitle>
        </LikedRestaurantHeader>
        <ScrollWrapper>
          <Restaurants>
            {restaurants?.map((restaurant) => {
              const { _id, title, address, road_address } = restaurant;
              return (
                <Restaurant key={_id}>
                  <RestaurantInfoCard
                    title={title}
                    address={address}
                    road_address={road_address}
                  />
                  <LikeButton
                    onClick={() => {
                      restaurantUnlikeMutation.mutate(title);
                    }}
                  >
                    <CustomIcon name="liked" size="20" color="red" />
                  </LikeButton>
                </Restaurant>
              );
            })}
          </Restaurants>
        </ScrollWrapper>
      </LikedRestaurantContainer>
      <Map ref={mapRef} />
    </LikedRestaurantWrapper>
  );
};

export default LikedRestaurant;

const LikedRestaurantWrapper = styled.section`
  ${({ theme }) => theme.mixins.flexBox()}
  flex-shrink: 0;
  width: 50%;
  height: 80vh;
  background-color: ${({ theme }) => theme.mainWhite};
  padding: ${({ theme }) => theme.spancingMedium};
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const LikedRestaurantContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'center', 'start')};
  width: 35%;
  height: 100%;
  padding: ${({ theme }) => theme.spacingSemiMedium};
  box-shadow: 10px 0 8px -5px rgba(0, 0, 0, 0.24);
  z-index: 2;
`;

const LikedRestaurantHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBox()};
  height: 13%;
`;

const LikedRestaurantTitle = styled.h2`
  ${MediumTitle}
  color: ${({ theme }) => theme.mainBlack};
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 87%;
  margin: ${({ theme }) => theme.spacingSemiMedium} 0;
  border-radius: 0.8rem;
  box-shadow: inset rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: auto;
`;

const Restaurants = styled.ul`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacingRegular};
`;

const Restaurant = styled.li`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: 18%;
  padding: ${({ theme }) => theme.spacingRegular};
  margin-bottom: ${({ theme }) => theme.spacingSemiMedium};
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const LikeButton = styled.button``;

const Map = styled.div`
  width: 65%;
  height: 100%;
`;
