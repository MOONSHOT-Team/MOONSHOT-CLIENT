import imgWordmarkWhite from '@assets/images/imgWordmarkWhite.png';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import imgGoogleLogin from './assets/images/imgGoogleLogin.png';
import imgKakaoLogin from './assets/images/imgKakaoLogin.png';

/** 로그인 페이지 */
const SignIn = () => {
  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URL;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div css={signInContainer}>
      <section css={loginSection}>
        <h1>
          <img src={imgWordmarkWhite} alt="work" width={257} height={68} />
        </h1>
        <StSubText>
          유난한 도전을 위한 체계적인 목표 관리와 성과 트래킹, 지금 바로 문샷에서 시작해보세요.
        </StSubText>
        <button type="button" onClick={handleLogin}>
          <img src={imgKakaoLogin} alt="kakao-login-button" width={300} height={45} />
        </button>
        <Link to="https://prod.moonshotyou.com/v1/user/googleLogin">
          <img src={imgGoogleLogin} alt="google-login-button" width={300} height={45} />
        </Link>
      </section>
      <section css={brandingSection}>
        image / gif 브랜딩 관련 소스 or 프로토타입 소스가 들어갈 예정. 합숙 1주차 내 전달
        예정입니다!
      </section>
    </div>
  );
};

export default SignIn;

const signInContainer = css`
  display: flex;
  gap: 13.2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 9rem;
`;

const loginSection = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  width: 42rem;
`;

const brandingSection = css`
  width: 68.7rem;
  height: 58.7rem;
  color: #000;
  background-color: #d9d9d9;
`;

const StSubText = styled.h2`
  ${({ theme }) => theme.fonts.title_20_semibold};

  margin-bottom: 3.4rem;
  word-break: keep-all;
  word-wrap: break-word;
`;
