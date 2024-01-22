import { signInInstance } from './instance';

const getNewAccessToken = async () => {
  console.log('is running');

  try {
    const REFRESH_TOKEN = localStorage.getItem('REFRESH_TOKEN');
    console.log('refresh token', REFRESH_TOKEN);

    const response = await signInInstance.post(
      '/v1/user/reissue',
      {},
      {
        headers: {
          Authorization: REFRESH_TOKEN,
        },
      },
    );
    console.log('res', response);

    const { accessToken, refreshToken } = response.data.data;

    console.log('res.data', response.data);

    localStorage.setItem('ACCESS_TOKEN', accessToken);
    localStorage.setItem('REFRESH_TOKEN', refreshToken);

    return true;
  } catch {
    localStorage.clear();
    console.log('what');

    window.location.href = '/sign-in';

    return false;
  }
};

export default getNewAccessToken;
