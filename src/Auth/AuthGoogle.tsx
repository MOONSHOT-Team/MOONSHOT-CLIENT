import { fetcherPost } from '@apis/fetcher';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { SwrType } from './type';

const AuthGoogle = () => {
  const navigate = useNavigate();
  const googleCode = new URL(window.location.href).searchParams.get('code');

  const { data, error, isLoading } = useSWR<SwrType, Error>('/v1/user/login', (url: string) =>
    fetcherPost(url, googleCode!, 'GOOGLE'),
  );

  if (data) {
    const { accessToken, refreshToken } = data.data.data.token;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    navigate('/dashboard');
  }

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
