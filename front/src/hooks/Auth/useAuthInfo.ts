import { useQuery } from 'react-query';
import { getAuthInfo } from '../../api/authFetcher';

interface AuthInfo {
  userId: number;
  email: string;
  nickname: string;
  profileUrl: string;
}

export default function useAuthInfo(userId: string) {
  return useQuery<AuthInfo, Error>(['authRecips', userId], () =>
    getAuthInfo(userId),
  );
}
