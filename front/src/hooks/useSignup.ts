import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authRegisterRequest } from '../api/authFetcher';
import { PATH } from '../customRouter';

export default function useSignup() {
  const navigate = useNavigate();

  const mutation = useMutation(authRegisterRequest, {
    onSuccess: (success) => {
      navigate(PATH.LOGIN);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
