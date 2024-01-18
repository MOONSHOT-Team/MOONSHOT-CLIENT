import axios from 'axios';

const axiosFetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // 에러 처리, 에러를 throw하거나 기본값을 반환할 수 있습니다.
    console.error('데이터를 가져오는 중 에러 발생:', error);
    throw error;
  }
};

export default axiosFetcher;
