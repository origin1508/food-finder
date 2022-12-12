import { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import useSetAlert from '../hooks/useSetAlert';
import { isLoginSelector } from '../atom/auth';

interface AuthProps {
  children: ReactNode;
}

const Auth = ({ children }: AuthProps) => {
  const isLogin = useRecoilValue(isLoginSelector);
  const { setAlertError } = useSetAlert();
  useEffect(() => {
    if (!isLogin) {
      setAlertError({ error: '로그인이 필요합니다.' });
    }
  }, [isLogin]);

  return <>{isLogin ? children : <Navigate to={'/login'} />}</>;
};

export default Auth;
