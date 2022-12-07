import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import useSetAlert from './useSetAlert';
import {
  restaurantLikeRequest,
  restaurantUnlikeRequest,
} from '../api/restaurantFetcher';

const useRestaurant = () => {
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

  const restaurantUnlike = async (
    result: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    const { place_name } = result;
    const res = await restaurantUnlikeRequest(place_name);

    return res;
  };

  const restaurantLikeMutation = useMutation(restaurantLike, {
    onSuccess: (data) => {
      const { message } = data;
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
      setAlertSuccess({ success: message });
    },
    onError: (error) => {
      if (error && error instanceof AxiosError) {
        const { message } = error.response?.data;
        setAlertError({ error: message });
      }
    },
  });

  return { restaurantLikeMutation, restaurantUnlikeMutation };
};

export default useRestaurant;
