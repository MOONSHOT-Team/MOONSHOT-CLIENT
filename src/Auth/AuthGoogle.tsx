import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { fetcherPost } from './apis/fetcher';
import { SwrType } from './type';

const AuthGoogle = () => {
  const navigate = useNavigate();
  const googleCode = new URL(window.location.href).searchParams.get('code');

  const { data, error, isLoading } = useSWR<SwrType, Error>('/v1/user/login', (url: string) =>
    fetcherPost(url, googleCode!, 'GOOGLE'),
  );

  useEffect(() => {
    if (!data) return;

    const { accessToken, refreshToken } = data.data.data.token;

    localStorage.setItem('ACCESS_TOKEN', accessToken);
    localStorage.setItem('REFRESH_TOKEN', refreshToken);

    navigate('/sign-in/nickname');
  }, [data, navigate]);

  return (
    <>
      <p>{googleCode}</p>
      {isLoading && <p style={{ fontSize: '12rem' }}>loading,,,</p>}
      {error && <p style={{ fontSize: '12rem' }}>Error,,,</p>}
      {data && <p style={{ fontSize: '12rem' }}>Success!!!</p>}
    </>
  );
};

export default AuthGoogle;
