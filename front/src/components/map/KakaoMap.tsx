import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import useRestaurant from '../../hooks/useRestaurant';
import useSearchForm from '../../hooks/useSearchForm';
import useKakaoMap from '../../hooks/useKakaoMap';
import Search from '../common/Search';
import CustomIcon from '../icons/CustomIcon';
import { likedRestaurantIdState } from '../../atom/restaurant';
import { SearchValue } from '../../types/search/searchType';

const KakaoMap = ({ keyword }: SearchValue) => {
  const searchResult = keyword;
  const scrollRef = useRef<HTMLDivElement>(null);
  const likedRestaurantId = useRecoilValue(likedRestaurantIdState);
  const { restaurantLikeMutation, restaurantUnlikeMutation } = useRestaurant();
  const { register, handleSubmit } = useSearchForm();
  const {
    mapRef,
    placesResult,
    currentPage,
    pages,
    gotoPage,
    handlePlacesSearch,
  } = useKakaoMap(searchResult);

  useEffect(() => {
    handlePlacesSearch({ keyword: searchResult });
  }, [searchResult]);

  return (
    <KakaoMapContainer>
      <PlacesListContainer>
        <Search
          register={register}
          onSubmit={handleSubmit(handlePlacesSearch)}
          placeholder="지역 키워드를 입력해주세요."
        />
        <ScrollWrapper ref={scrollRef}>
          <PlacesList>
            {placesResult?.map((result, index) => {
              const {
                id,
                place_name,
                place_url,
                road_address_name,
                address_name,
                phone,
              } = result;
              return (
                <PlaceItem key={id}>
                  <PlaceMarker>{index + 1}</PlaceMarker>
                  <PlaceInfo
                    onClick={() => {
                      window.open(place_url);
                    }}
                  >
                    <PlaceName>{place_name}</PlaceName>
                    <PlaceAddress>{road_address_name}</PlaceAddress>
                    <PlaceSubAddress>{address_name}</PlaceSubAddress>
                    <PlaceTelNumber>{phone}</PlaceTelNumber>
                  </PlaceInfo>
                  {likedRestaurantId.includes(Number(id)) ? (
                    <PlaceLikeButton
                      onClick={() => {
                        restaurantUnlikeMutation.mutate(Number(id));
                      }}
                    >
                      <CustomIcon name="liked" size="20" color="red" />
                    </PlaceLikeButton>
                  ) : (
                    <PlaceLikeButton
                      onClick={() => {
                        restaurantLikeMutation.mutate(result);
                      }}
                    >
                      <CustomIcon name="like" size="20" />
                    </PlaceLikeButton>
                  )}
                </PlaceItem>
              );
            })}
          </PlacesList>
        </ScrollWrapper>
        <Pagination>
          {pages &&
            pages.map((page) => {
              return (
                <Page
                  key={page}
                  onClick={() => {
                    gotoPage && gotoPage(page);
                    scrollRef.current?.scrollTo(0, 0);
                  }}
                  isOn={currentPage === page ? true : false}
                >
                  {page}
                </Page>
              );
            })}
        </Pagination>
      </PlacesListContainer>
      <Map ref={mapRef}></Map>
    </KakaoMapContainer>
  );
};

export default KakaoMap;

const KakaoMapContainer = styled.article`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const PlacesListContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column', 'center', 'start')};
  width: 40%;
  height: 100%;
  padding: ${({ theme }) => theme.spacingSemiMedium};
  flex-grow: 1;
  flex-shrink: 0;
`;

const Map = styled.div`
  width: 60%;
  height: 100%;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: ${({ theme }) => theme.spacingSemiMedium} 0;
  border-radius: 0.8rem;
  box-shadow: inset rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: auto;
`;

const PlacesList = styled.ul`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacingRegular};
`;

const PlaceItem = styled.li`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: 18%;
  padding: ${({ theme }) => theme.spacingRegular};
  margin-bottom: ${({ theme }) => theme.spacingSemiMedium};
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const PlaceMarker = styled.div`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 15%;
  height: 100%;
`;

const PlaceInfo = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'start', 'center')}
  width: 80%;
  height: 100%;
  line-height: 2rem;
  cursor: pointer;
`;

const PlaceName = styled.span`
  font-weight: ${({ theme }) => theme.weightSemiBold};
`;

const PlaceAddress = styled.span``;

const PlaceSubAddress = styled.span`
  color: ${({ theme }) => theme.darkGrey};
`;

const PlaceTelNumber = styled.span`
  color: ${({ theme }) => theme.themeColor};
`;

const PlaceLikeButton = styled.button``;

const Pagination = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: 3rem;
  gap: ${({ theme }) => theme.spacingSemiMedium};
  color: ${({ theme }) => theme.darkGrey};
`;

const Page = styled.button<{ isOn: boolean }>`
  width: 2rem;
  font-size: ${({ theme }) => theme.fontSemiMedium};
  color: ${({ isOn, theme }) => isOn && theme.themeColor};
`;
