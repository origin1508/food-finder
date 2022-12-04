import { useMutation } from 'react-query';
import { authProfileImageUpdate } from '../api/authFetcher';
import { authState } from '../atom/auth';
import { useSetRecoilState } from 'recoil';
import useSetAlert from './useSetAlert';

export default function useEditImg() {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const setAuthState = useSetRecoilState(authState);

  const mutation = useMutation(authProfileImageUpdate, {
    onSuccess: (data) => {
      setAuthState((prev) => {
        return {
          ...prev!,
          profileUrl:
            'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
          // profileUrl: data?.result.profileUrl,
        };
      });
      setAlertSuccess({ success: data?.message });
    },
    onError: (error: any) => {
      setAlertError({ error: error.response.data.message });
      console.log(error);
    },
  });

  return mutation;
}
