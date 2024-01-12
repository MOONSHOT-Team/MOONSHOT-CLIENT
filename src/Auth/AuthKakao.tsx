import { fetcherPost } from '@apis/fetcher';
import useSWR from 'swr';

const AuthKakao = () => {
  const kakaoCode = new URL(window.location.href).searchParams.get('code');

  const { data, error, isLoading } = useSWR('/v1/user/login', (url) =>
    fetcherPost(url, kakaoCode!),
  );

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
