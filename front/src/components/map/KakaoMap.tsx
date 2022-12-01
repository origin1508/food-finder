import { useEffect } from 'react';
import styled from 'styled-components';
import useSearchForm from '../../hooks/useSearchForm';
import useKakaoMap from '../../hooks/useKakaoMap';
import Search from '../common/Search';

const KakaoMap = () => {
  const serachResult = '김치찌개';
  const { register, handleSubmit } = useSearchForm();
  const { kakaoMap, mapRef, placesResult, handlePlacesSearch } =
    useKakaoMap(serachResult);

  useEffect(() => {
    handlePlacesSearch({ keyword: '김치찌개' });
  }, []);

  return (
    <KakaoMapContainer>
      <PlacesListContainer>
        <Search
          register={register}
          onSubmit={handleSubmit(handlePlacesSearch)}
          placeholder="지역을 입력해주세요"
        />
        <ScrollWrapper>
          <PlacesList>
            {placesResult?.map((result, index) => {
              return (
                <PlaceItem key={result.id}>
                  <PlaceMarker>{index + 1}</PlaceMarker>
                  <PlaceInfo>
                    <PlaceName>{result.place_name}</PlaceName>
                    <PlaceAddress>{result.road_address_name}</PlaceAddress>
                    <PlaceSubAddress>{result.address_name}</PlaceSubAddress>
                    <PlaceTelNumber>{result.phone}</PlaceTelNumber>
                  </PlaceInfo>
                </PlaceItem>
              );
            })}
          </PlacesList>
        </ScrollWrapper>
      </PlacesListContainer>
      <Map ref={mapRef}></Map>
    </KakaoMapContainer>
  );
};

export default KakaoMap;

const KakaoMapContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const PlacesListContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column', 'center', 'start')};
  justify-content: 
  width: 40%;
  height: 100%;
  padding: ${({ theme }) => theme.spacingSemiMedium};
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.spacingSemiMedium};
  border-radius: 0.8rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: auto;
  background-color: white;
`;

const PlacesList = styled.ul`
  width: 100%;
  height: 100%;
`;

const PlaceItem = styled.li`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: 15%;
  padding: ${({ theme }) => theme.spacingRegular};
  border-bottom: 1px solid ${({ theme }) => theme.darkGrey};
`;

const PlaceMarker = styled.div`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 15%;
  height: 100%;
`;

const PlaceInfo = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'start', 'center')}
  width: 85%;
  height: 100%;
  line-height: 2rem;
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

const Map = styled.div`
  width: 100%;
  height: 100%;
`;
