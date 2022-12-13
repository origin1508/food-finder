import { useMutation, useQueryClient } from 'react-query';
import { recipeCommentUpdate } from '../../api/recipeFetcher';
import useSetAlert from '../useSetAlert';
import { ErrorType } from '../../types/error';

export default function useEditComment(recipeId: string) {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const queryClient = useQueryClient();

  const mutation = useMutation(recipeCommentUpdate, {
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
