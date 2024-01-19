import Loading from '@components/Lodaing';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { fetcherPost } from './apis/fetcher';
import { SwrType } from './type';

const AuthGoogle = () => {
  const navigate = useNavigate();
  const googleCode = new URL(window.location.href).searchParams.get('code');

  const { data } = useSWR<SwrType, Error>('/v1/user/login', (url: string) =>
    fetcherPost(url, googleCode!, 'GOOGLE'),
  );

  useEffect(() => {
    if (!data) return;

    const { accessToken, refreshToken } = data.data.data.token;

    localStorage.setItem('ACCESS_TOKEN', accessToken);
    localStorage.setItem('REFRESH_TOKEN', refreshToken);

    navigate('/sign-in/nickname');
  }, [data, navigate]);

  return <Loading />;
};

export default AuthGoogle;
