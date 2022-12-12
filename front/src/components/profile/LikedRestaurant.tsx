import { useEffect } from 'react';
import styled from 'styled-components';
import useKakaoMap from '../../hooks/useKakaoMap';
import useRestaurant from '../../hooks/useRestaurant';
import RestaurantInfoCard from './RestaurantInfoCard';
import CustomIcon from '../icons/CustomIcon';
import { MediumTitle } from '../../styles/commonStyle';

const LikedRestaurant = () => {
  const { kakaoMap, mapRef, removeMarker, addRestaurantMarker } = useKakaoMap();
  const { likedRestaurantQuery, restaurantUnlikeMutation } = useRestaurant();
  const restaurants = likedRestaurantQuery.data?.result;

  useEffect(() => {
    removeMarker();
    if (restaurants && restaurants.length === 0) return;
    restaurants && addRestaurantMarker(restaurants);
  }, [kakaoMap, restaurants]);

  return (
    <LikedRestaurantWrapper>
      <LikedRestaurantContainer>
        <LikedRestaurantHeader>
          <LikedRestaurantTitle>Liked Restaurant</LikedRestaurantTitle>
        </LikedRestaurantHeader>
        <ScrollWrapper>
          <Restaurants>
            {restaurants && restaurants.length > 0 ? (
              restaurants.map((restaurant) => {
                const { restaurant_id, title, address, road_address, url } =
                  restaurant;
                return (
                  <Restaurant key={restaurant_id}>
                    <RestaurantInfoCard
                      title={title}
                      address={address}
                      road_address={road_address}
                      onClick={() => {
                        window.open(url);
                      }}
                    />
                    <LikeButton
                      onClick={() => {
                        restaurantUnlikeMutation.mutate(restaurant_id);
                      }}
                    >
                      <CustomIcon name="liked" size="20" color="red" />
                    </LikeButton>
                  </Restaurant>
                );
              })
            ) : (
              <EmptyText>좋아요한 맛집이 없습니다.</EmptyText>
            )}
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
  width: 80%;
  height: 80vh;
  background-color: ${({ theme }) => theme.mainWhite};
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

const EmptyText = styled.p`
  ${({ theme }) => theme.mixins.flexBox()}
  text-align: center;
  width: 100%;
  height: 100%;
  font-size: ${({ theme }) => theme.fontSemiMedium};
`;
