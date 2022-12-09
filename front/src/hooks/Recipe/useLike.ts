import { useMutation, useQueryClient } from 'react-query';
import { authLikeRequest, authUnLikeRequest } from '../../api/authFetcher';
import useSetAlert from '../useSetAlert';
import { ErrorType } from '../../types/error';

function useLike(userId: number) {
  const { setAlertError, setAlertSuccess } = useSetAlert();
  const queryClient = useQueryClient();

  const mutation = useMutation(authLikeRequest, {
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries(['authLikeRecips', userId]);
      setAlertSuccess({ success: message });
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}

function useUnLike(userId: number) {
  const { setAlertError, setAlertSuccess } = useSetAlert();
  const queryClient = useQueryClient();

  const mutation = useMutation(authUnLikeRequest, {
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries(['authLikeRecips', userId]);
      setAlertSuccess({ success: message });
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}

export { useLike, useUnLike };
