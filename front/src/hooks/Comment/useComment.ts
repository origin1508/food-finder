import { useMutation } from 'react-query';
import { recipeCommentRequest } from '../../api/recipeFetcher';
import useSetAlert from '../useSetAlert';
import { ErrorType } from '../../types/error';

export default function useComment() {
  const { setAlertSuccess, setAlertError } = useSetAlert();

  const mutation = useMutation(recipeCommentRequest, {
    onSuccess: ({ message }) => {
      setAlertSuccess({ success: message });
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}
