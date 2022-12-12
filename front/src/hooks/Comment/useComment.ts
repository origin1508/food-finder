import { useMutation, useQueryClient } from 'react-query';
import { recipeCommentRequest } from '../../api/recipeFetcher';
import useSetAlert from '../useSetAlert';
import { ErrorType } from '../../types/error';

export default function useComment(recipeId: string) {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const queryClient = useQueryClient();

  const mutation = useMutation(recipeCommentRequest, {
    onSuccess: ({ message }) => {
      setAlertSuccess({ success: message });
      queryClient.invalidateQueries(['racipeDetail', recipeId]);
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}
