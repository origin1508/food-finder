import { useState, useEffect, useRef, useCallback } from 'react';
import { SearchValue } from '../types/search/searchType';

const useKakaoMap = (searchResult: string) => {
  const [kakaoMap, setkakaoMap] = useState<kakao.maps.Map>();
  const [placesResult, setPlacesResult] =
    useState<kakao.maps.services.PlacesSearchResult>();
  const [pagination, setPagination] = useState<kakao.maps.Pagination>();
  const mapRef = useRef<HTMLDivElement>(null);
  const ps = new kakao.maps.services.Places();
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  useEffect(() => {
    if (mapRef === null) return;

    const mapContainer = mapRef.current;
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 10,
    };
    const map = new kakao.maps.Map(mapContainer as HTMLDivElement, mapOption);

    setkakaoMap(map);
  }, [mapRef]);

  const handlePlacesSearch = useCallback(
    (data: SearchValue) => {
      const { keyword } = data;
      ps.keywordSearch(
        searchResult + ' ' + keyword,
        (result, status, pagination) => {
          setPlacesResult(result);
          setPagination(pagination);
        },
      );
    },
    [placesResult, pagination, setPlacesResult, setPagination],
  );

  return { kakaoMap, mapRef, placesResult, handlePlacesSearch };
};

export default useKakaoMap;
