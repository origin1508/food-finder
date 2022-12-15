import { useMutation, useQueryClient } from 'react-query';
import { recipeRequestUpdate } from '../../api/recipeFetcher';
import useSetAlert from '../useSetAlert';
import { ErrorType } from '../../types/error';

export default function useRatingUpadate(recipeId: string) {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const queryClient = useQueryClient();

  const mutation = useMutation(recipeRequestUpdate, {
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries(['racipeDetail', recipeId]);
      setAlertSuccess({ success: message });
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}
