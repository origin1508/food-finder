import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { SearchValue } from '../types/search/searchType';
import {
  MARKER_IMAGE_URL,
  IMAGE_SIZE_WIDTH,
  IMAGE_SIZE_HEIGHT,
  SPRITE_SIZE_WIDTH,
  SPRITE_SIZE_HEIGHT,
  OFFSET_X,
  OFFSET_Y,
  DEFAULT_LAT,
  DEFAULT_LNG,
  DEFAULT_MAP_LEVEL,
} from '../constants/kakaoMap';

const useKakaoMap = (searchResult: string) => {
  const [kakaoMap, setkakaoMap] = useState<kakao.maps.Map>();
  const [placesResult, setPlacesResult] =
    useState<kakao.maps.services.PlacesSearchResult>();
  const [pagination, setPagination] = useState<kakao.maps.Pagination>();
  const [markers, setMakers] = useState<kakao.maps.Marker[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const ps = new kakao.maps.services.Places();
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const imageSize = new kakao.maps.Size(IMAGE_SIZE_WIDTH, IMAGE_SIZE_HEIGHT);
  const spriteSize = new kakao.maps.Size(SPRITE_SIZE_WIDTH, SPRITE_SIZE_HEIGHT);
  const offset = new kakao.maps.Point(OFFSET_X, OFFSET_Y);

  useEffect(() => {
    if (!mapRef || mapRef.current === null) return;
    const mapContainer = mapRef.current;
    const mapOption = {
      center: new kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
      level: DEFAULT_MAP_LEVEL,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    setkakaoMap(map);
  }, [mapRef]);

  useEffect(() => {
    placesResult && addMarker(placesResult);
  }, [placesResult]);

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

  const addMarker = useCallback(
    (result: kakao.maps.services.PlacesSearchResult) => {
      if (!kakaoMap) return;

      removeMarker();
      const bounds = new kakao.maps.LatLngBounds();
      result.forEach((place, index) => {
        const { x, y } = place;
        const placePosition = new kakao.maps.LatLng(Number(y), Number(x));
        const imgOptions = {
          spriteSize: spriteSize,
          spriteOrigin: new kakao.maps.Point(0, index * 46 + 10),
          offset: offset,
        };
        const markerImage = new kakao.maps.MarkerImage(
          MARKER_IMAGE_URL,
          imageSize,
          imgOptions,
        );
        const marker = new kakao.maps.Marker({
          position: placePosition,
          image: markerImage,
        });
        bounds.extend(placePosition);
        marker.setMap(kakaoMap);
        setMakers((prev) => {
          return [...prev, marker];
        });
        displayInfowindow(place, marker);
      });
      kakaoMap.setBounds(bounds);
    },
    [placesResult, markers, setMakers, setPlacesResult],
  );

  const removeMarker = useCallback(() => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMakers([]);
  }, [markers]);

  const displayInfowindow = (
    place: kakao.maps.services.PlacesSearchResultItem,
    marker: kakao.maps.Marker,
  ) => {
    if (!kakaoMap) return;

    kakao.maps.event.addListener(marker, 'mouseover', () => {
      infowindow.setContent(`<div>${place.place_name}</div>`);
      infowindow.open(kakaoMap, marker);
    });

    kakao.maps.event.addListener(marker, 'mouseout', () => {
      infowindow.close();
    });
  };

  const pages = useMemo(() => {
    if (pagination instanceof kakao.maps.Pagination) {
      const { last } = pagination;
      const temp: number[] = Array(last)
        .fill(0)
        .map((item, index) => item + index);
      return temp;
    }
  }, [pagination]);

  const currentPage = useMemo(() => {
    if (pagination instanceof kakao.maps.Pagination) {
      return pagination.current;
    }
  }, [pagination]);

  const gotoPage = useMemo(() => {
    if (pagination instanceof kakao.maps.Pagination) {
      return pagination.gotoPage;
    }
  }, [pagination]);

  return {
    kakaoMap,
    mapRef,
    placesResult,
    pages,
    currentPage,
    gotoPage,
    handlePlacesSearch,
  };
};

export default useKakaoMap;
