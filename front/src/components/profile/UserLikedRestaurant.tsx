import { useEffect } from 'react';
import styled from 'styled-components';
import useKakaoMap from '../../hooks/useKakaoMap';
import useLikedRestaurant from '../../hooks/useLikedRestaurant';
import RestaurantInfoCard from './RestaurantInfoCard';
import CustomIcon from '../icons/CustomIcon';
import { MediumTitle } from '../../styles/commonStyle';

const UserLikedRestaurant = () => {
  const { kakaoMap, mapRef, removeMarker, addRestaurantMarker } = useKakaoMap();
  const { likedRestaurantQuery, restaurantUnlikeMutation } =
    useLikedRestaurant();
  const restaurants = likedRestaurantQuery.data?.result;

  useEffect(() => {
    removeMarker();
    if (restaurants && restaurants.length === 0) return;
    restaurants && addRestaurantMarker(restaurants);
  }, [kakaoMap, restaurants]);

  return (
    <UserLikedRestaurantWrapper>
      <UserLikedRestaurantContainer>
        <UserLikedRestaurantHeader>
          <UserLikedRestaurantTitle>Liked Restaurant</UserLikedRestaurantTitle>
        </UserLikedRestaurantHeader>
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
      </UserLikedRestaurantContainer>
      <Map ref={mapRef} />
    </UserLikedRestaurantWrapper>
  );
};

export default UserLikedRestaurant;

const UserLikedRestaurantWrapper = styled.section`
  ${({ theme }) => theme.mixins.flexBox()}
  flex-shrink: 0;
  width: 80%;
  height: 80vh;
  background-color: ${({ theme }) => theme.mainWhite};
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    ${({ theme }) => theme.mixins.flexBox('column')}
    width: 90%;
  }
`;

const UserLikedRestaurantContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'center', 'start')};
  width: 60rem;
  height: 100%;
  padding: ${({ theme }) => theme.spacingSemiMedium};
  box-shadow: 10px 0 8px -5px rgba(0, 0, 0, 0.24);
  z-index: 2;
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    width: 100%;
    height: 40%;
    box-shadow: 0 10px 8px -5px rgba(0, 0, 0, 0.24);
  }
`;

const UserLikedRestaurantHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBox()};
  height: 13%;
`;

const UserLikedRestaurantTitle = styled.h2`
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
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: ${({ theme }) => theme.spacingRegular};
  }
`;

const Restaurant = styled.li`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: 12rem;
  padding: ${({ theme }) => theme.spacingRegular};
  margin-bottom: ${({ theme }) => theme.spacingSemiMedium};
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const LikeButton = styled.button``;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const EmptyText = styled.p`
  ${({ theme }) => theme.mixins.flexBox()}
  text-align: center;
  width: 100%;
  height: 100%;
  font-size: ${({ theme }) => theme.fontSemiMedium};
`;
