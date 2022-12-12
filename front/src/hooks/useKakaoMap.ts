import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import useSetAlert from './useSetAlert';
import { SearchValue } from '../types/search/searchType';
import { LikedRestaurantQuery } from '../types/restaurant/restaurantType';
import {
  MARKER_IMAGE_URL,
  IMAGE_SIZE_WIDTH,
  IMAGE_SIZE_HEIGHT,
  BIG_IMAGE_SIZE,
  SPRITE_SIZE_WIDTH,
  SPRITE_SIZE_HEIGHT,
  OFFSET_X,
  OFFSET_Y,
  DEFAULT_LAT,
  DEFAULT_LNG,
  DEFAULT_MAP_LEVEL,
  COUNT_PER_PAGE,
} from '../constants/kakaoMap';
import favoriteMarkerImage from '../assets/favoriteMarker2.png';

const useKakaoMap = (searchResult?: string) => {
  const [kakaoMap, setkakaoMap] = useState<kakao.maps.Map>();
  const [placesResult, setPlacesResult] =
    useState<kakao.maps.services.PlacesSearchResult>();
  const [pagination, setPagination] = useState<kakao.maps.Pagination>();
  const [markers, setMakers] = useState<kakao.maps.Marker[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const { setAlertError } = useSetAlert();
  const ps = new kakao.maps.services.Places();
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const imageSize = new kakao.maps.Size(IMAGE_SIZE_WIDTH, IMAGE_SIZE_HEIGHT);
  const bigImageSize = new kakao.maps.Size(BIG_IMAGE_SIZE, BIG_IMAGE_SIZE);
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
      searchResult &&
        ps.keywordSearch(
          searchResult + ' ' + keyword,
          (result, status, pagination) => {
            if (status === kakao.maps.services.Status.OK) {
              setPlacesResult(result);
              setPagination(pagination);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              setAlertError({ error: '검색 결과가 존재하지 않습니다.' });
              return;
            } else if (status === kakao.maps.services.Status.ERROR) {
              setAlertError({ error: '검색 결과 중 오류가 발생했습니다.' });
              return;
            }
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
    [kakaoMap, placesResult, markers, setMakers, setPlacesResult],
  );

  const removeMarker = useCallback(() => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMakers([]);
  }, [markers]);

  const addRestaurantMarker = useCallback(
    (restaurants: LikedRestaurantQuery['result']) => {
      if (!kakaoMap) return;

      const bounds = new kakao.maps.LatLngBounds();
      restaurants.forEach((restaurant) => {
        const { map_x, map_y } = restaurant;
        const restaurantPosition = new kakao.maps.LatLng(map_y, map_x);
        const markerImage = new kakao.maps.MarkerImage(
          favoriteMarkerImage,
          bigImageSize,
        );
        const marker = new kakao.maps.Marker({
          position: restaurantPosition,
          image: markerImage,
        });
        bounds.extend(restaurantPosition);
        marker.setMap(kakaoMap);
        setMakers((prev) => {
          return [...prev, marker];
        });
        // displayInfowindow(place, marker);
      });
      kakaoMap.setBounds(bounds);
    },
    [kakaoMap, markers, setMakers],
  );

  const displayInfowindow = (
    place: kakao.maps.services.PlacesSearchResultItem,
    marker: kakao.maps.Marker,
  ) => {
    if (!kakaoMap) return;
    const content =
      '<div style="padding: 1rem;">' + `<p>${place.place_name}</p>` + '</div>';

    kakao.maps.event.addListener(marker, 'mouseover', () => {
      infowindow.setContent(content);
      infowindow.open(kakaoMap, marker);
    });

    kakao.maps.event.addListener(marker, 'mouseout', () => {
      infowindow.close();
    });
  };

  const pages = useMemo(() => {
    if (pagination) {
      const { totalCount } = pagination;
      const lastPage: number = Math.floor(totalCount / COUNT_PER_PAGE);
      const temp: number[] = Array(lastPage)
        .fill(1)
        .map((item, index) => item + index);
      return temp;
    }
  }, [pagination]);

  const currentPage = useMemo(() => {
    if (pagination) {
      return pagination.current;
    }
  }, [pagination]);

  const gotoPage = useMemo(() => {
    if (pagination) {
      return pagination.gotoPage;
    }
  }, [pagination]);

  return {
    kakaoMap,
    mapRef,
    placesResult,
    pages,
    currentPage,
    removeMarker,
    gotoPage,
    handlePlacesSearch,
    addRestaurantMarker,
  };
};

export default useKakaoMap;
