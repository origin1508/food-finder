import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import useSetAlert from '../useSetAlert';
import { recipeDeleteRequest } from '../../api/recipeFetcher';

const useEditRecipe = () => {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const recipeDeleteMutation = useMutation(recipeDeleteRequest, {
    onSuccess: (data) => {
      const { message } = data;
      queryClient.invalidateQueries('authRecips');
      setAlertSuccess({ success: message });
      navigate(-1);
    },
    onError: (error) => {
      if (error && error instanceof AxiosError) {
        setAlertError({ error: error.message });
      } else {
        setAlertError({ error: 'request Error' });
      }
    },
  });
  return { recipeDeleteMutation };
};

export default useEditRecipe;
