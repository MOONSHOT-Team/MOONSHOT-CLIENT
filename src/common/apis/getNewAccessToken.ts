import { signInInstance } from './instance';

const getNewAccessToken = async () => {
  try {
    const REFRESH_TOKEN = localStorage.getItem('REFRESH_TOKEN');

    const response = await signInInstance.post(
      '/v1/user/reissue',
      {},
      {
        headers: {
          Authorization: REFRESH_TOKEN,
        },
      },
    );

    const { accessToken, refreshToken } = response.data.data;

    localStorage.setItem('ACCESS_TOKEN', accessToken);
    localStorage.setItem('REFRESH_TOKEN', refreshToken);

    return true;
  } catch {
    localStorage.clear();

    window.location.href = '/sign-in';

    return false;
  }
};

export default getNewAccessToken;
