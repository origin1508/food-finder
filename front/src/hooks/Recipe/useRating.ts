import { useMutation, useQueryClient } from 'react-query';
import { recipeRequestRating } from '../../api/recipeFetcher';
import useSetAlert from '../useSetAlert';
import { ErrorType } from '../../types/error';

export default function useRating(recipeId: string) {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const queryClient = useQueryClient();

  const mutation = useMutation(recipeRequestRating, {
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries(['racipeDetail', recipeId]);
      setAlertSuccess({ success: message });
      location.reload();
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}
