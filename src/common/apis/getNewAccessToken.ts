import axios from 'axios';

const getNewAccessToken = async () => {
  console.log('is running');

  try {
    const REFRESH_TOKEN = localStorage.getItem('REFRESH_TOKEN');
    console.log('refresh token', REFRESH_TOKEN);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/v1/user/reissue`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MDU5MzkzMDEsImV4cCI6MTcwNzE0ODkwMSwidXNlcklkIjoyfQ.kHmbU-lwrJY1Ktd9c_tfjHyph4p2li5H39Lh9Im2YFHYNU709TWMqioMAphI3qfGSi48ysHafHbVZB4A84uBUg',
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
