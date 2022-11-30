import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Search from '../common/Search';
import { MediumTitle } from '../../styles/commonStyle';
import axios from 'axios';

const { VITE_NAVER_DEV_CLIENT_ID, VITE_NAVER_DEV_CLIENT_SECRET } = import.meta
  .env;

interface Data {
  local: string;
  food: string;
}

interface PlaceList {
  address: string;
  category: string;
  description: string;
  link: string;
  mapx: string;
  mapy: string;
  roadAddress: string;
  telephone: string;
  title: string;
  thumbnail?: string;
}

const PlaceResult = () => {
  const MapRef = useRef<HTMLDivElement>(null);
  const [placeList, setPlaceList] = useState<PlaceList[]>();

  const getSearchImg = async (address: string) => {
    const endpoint = '/naverApi/v1/search/image';
    const display = 5;
    const res = await axios.get(endpoint, {
      params: {
        query: address,
        display: display,
      },
      headers: {
        'X-Naver-Client-Id': VITE_NAVER_DEV_CLIENT_ID,
        'X-Naver-Client-Secret': VITE_NAVER_DEV_CLIENT_SECRET,
      },
    });
    console.log('이미지검색 :', res.data.items);
    const { thumbnail } = res.data.items[0];
    return thumbnail;
  };

  const handleSearchClick = async () => {
    const endpoint = '/naverApi/v1/search/local.json';
    const query = '김치찌개 잠실역';

    const res = await axios.get(endpoint, {
      params: {
        query: query,
        display: 5,
      },
      headers: {
        'X-Naver-Client-Id': VITE_NAVER_DEV_CLIENT_ID,
        'X-Naver-Client-Secret': VITE_NAVER_DEV_CLIENT_SECRET,
      },
    });
    const items: [PlaceList] = res.data.items;
    // items.map((item) => {
    //   const { title, roadAddress } = item;
    //   const thumbnail = getSearchImg(title + ' ' + roadAddress);
    //   return { ...item, thumbnail: thumbnail };
    // });

    console.log(items);
    getSearchImg('서울김밥');
  };
  useEffect(() => {
    const map = MapRef.current && new window.naver.maps.Map(MapRef.current);
  }, []);
  return (
    <PlaceResultContainer>
      <RecipeResultTitle>"김치찌개" 맛집</RecipeResultTitle>
      <MapContainer>
        <PlaceListContainer>
          <Search
            onSearchClick={handleSearchClick}
            placeholder="지역을 입력해주세요"
          />
        </PlaceListContainer>
        <Map ref={MapRef}></Map>
      </MapContainer>
    </PlaceResultContainer>
  );
};

export default PlaceResult;

const PlaceResultContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')};
  width: 100%;
  height: 80rem;
  margin: ${({ theme }) => theme.spacingLarge} 0;
  padding: 0 ${({ theme }) => theme.spacingLarge};
  gap: ${({ theme }) => theme.spacingLarge};
`;

const RecipeResultTitle = styled.h2`
  ${MediumTitle}
  align-self: start;
  color: ${({ theme }) => theme.mainBlack};
`;

const MapContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const PlaceListContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column', 'center', 'start')};
  justify-content: 
  width: 30%;
  height: 100%;
`;

const Map = styled.div`
  width: 80%;
  height: 100%;
`;
