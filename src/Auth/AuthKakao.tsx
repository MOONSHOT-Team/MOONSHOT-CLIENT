import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { fetcherPost } from './apis/fetcher';
import { SwrType } from './type';

const AuthKakao = () => {
  const navigate = useNavigate();
  const kakaoCode = new URL(window.location.href).searchParams.get('code');

  const { data, error, isLoading } = useSWR<SwrType, Error>('/v1/user/login', (url: string) =>
    fetcherPost(url, kakaoCode!, 'KAKAO'),
  );

  useEffect(() => {
    if (data) {
      const { accessToken, refreshToken } = data.data.data.token;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/dashboard');
    }
  }, [data, navigate]);

  return (
    <>
      <p>{kakaoCode}</p>
      {isLoading && <p style={{ fontSize: '12rem' }}>loading,,,</p>}
      {error && <p style={{ fontSize: '12rem' }}>Error,,,</p>}
      {data && <p style={{ fontSize: '12rem' }}>Success!!!</p>}
    </>
  );
};

export default AuthKakao;
