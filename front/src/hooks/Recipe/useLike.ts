import { useMutation } from 'react-query';
import { authLikeRequest, authUnLikeRequest } from '../../api/authFetcher';
import useSetAlert from '../useSetAlert';
import { ErrorType } from '../../types/error';

function useLike() {
  const { setAlertError } = useSetAlert();

  const mutation = useMutation(authLikeRequest, {
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}

function useUnLike() {
  const { setAlertError } = useSetAlert();

  const mutation = useMutation(authUnLikeRequest, {
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}

export { useLike, useUnLike };
