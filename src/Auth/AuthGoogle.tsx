import Loading from '@components/Loading';
import { css } from '@emotion/react';
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

  return (
    <div css={loadingCenter}>
      <Loading />
    </div>
  );
};

export default AuthGoogle;

const loadingCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
