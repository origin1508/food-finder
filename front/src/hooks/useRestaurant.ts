import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import useSetAlert from './useSetAlert';
import {
  getLikedRestaurant,
  restaurantLikeRequest,
  restaurantUnlikeRequest,
} from '../api/restaurantFetcher';
import { LikedRestaurantQuery } from '../types/restaurant/restaurantType';

const useRestaurant = () => {
  const queryClient = useQueryClient();
  const { setAlertError, setAlertSuccess } = useSetAlert();

  const restaurantLike = async (
    result: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    const { place_name, place_url, road_address_name, address_name, x, y } =
      result;
    const res = await restaurantLikeRequest({
      title: place_name,
      address: address_name,
      roadAddress: road_address_name,
      mapX: Number(x),
      mapY: Number(y),
      link: place_url,
    });

    return res;
  };

  const restaurantUnlike = async (place_name: string) => {
    const res = await restaurantUnlikeRequest(place_name);

    return res;
  };

  const likedRestaurantQuery = useQuery<LikedRestaurantQuery>(
    'likedRestaurant',
    getLikedRestaurant,
  );

  const restaurantLikeMutation = useMutation(restaurantLike, {
    onSuccess: (data) => {
      const { message } = data;
      queryClient.invalidateQueries('likedRestaurant');
      setAlertSuccess({ success: message });
    },
    onError: (error) => {
      if (error && error instanceof AxiosError) {
        const { message } = error.response?.data;
        setAlertError({ error: message });
      }
    },
  });

  const restaurantUnlikeMutation = useMutation(restaurantUnlike, {
    onSuccess: (data) => {
      const { message } = data;
      queryClient.invalidateQueries('likedRestaurant');
      setAlertSuccess({ success: message });
    },
    onError: (error) => {
      if (error && error instanceof AxiosError) {
        const { message } = error.response?.data;
        setAlertError({ error: message });
      }
    },
  });

  return {
    likedRestaurantQuery,
    restaurantLikeMutation,
    restaurantUnlikeMutation,
  };
};

export default useRestaurant;
