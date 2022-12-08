import { useMutation } from 'react-query';
import { recipeRequestRating } from '../../api/recipeFetcher';
import useSetAlert from '../useSetAlert';
import { ErrorType } from '../../types/error';

export default function useRating() {
  const { setAlertSuccess, setAlertError } = useSetAlert();

  const mutation = useMutation(recipeRequestRating, {
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
