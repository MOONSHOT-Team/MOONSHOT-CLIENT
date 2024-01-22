import instance from './instance';

const getNewAccessToken = async () => {
  console.log('is running');

  try {
    const REFRESH_TOKEN = localStorage.getItem('refreshToken');

    const response = await instance.post('/v1/user/reissue', {
      headers: {
        Authorization: REFRESH_TOKEN,
      },
    });

    const { accessToken, refreshToken } = response.data;

    console.log('res.data', response.data);

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
