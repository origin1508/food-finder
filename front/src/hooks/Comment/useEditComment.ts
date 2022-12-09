import { useMutation } from 'react-query';
import { recipeCommentUpdate } from '../../api/recipeFetcher';
import useSetAlert from '../useSetAlert';
import { ErrorType } from '../../types/error';

export default function useEditComment() {
  const { setAlertSuccess, setAlertError } = useSetAlert();

  const mutation = useMutation(recipeCommentUpdate, {
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
