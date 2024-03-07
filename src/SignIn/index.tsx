import imgWordmarkWhite from '@assets/images/imgWordmarkWhite.png';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import imgGoogleLogin from './assets/images/imgGoogleLogin.png';
import imgKakaoLogin from './assets/images/imgKakaoLogin.png';
import imgViewcollections from './assets/images/imgViewcollections.png';

/** 로그인 페이지 */
const SignIn = () => {
  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URL;
  const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}/kakao&response_type=code`;
  const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_client_id}&redirect_uri=${redirect_uri}/google&response_type=code&scope=email profile`;
  const handleKakaoLoginButton = () => {
    window.location.href = kakaoURL;
  };

  const handleGoogleLoginButton = () => {
    window.location.href = GoogleURL;
  };

  return (
    <div css={signInContainer}>
      <section css={loginSection}>
        <h1>
          <img src={imgWordmarkWhite} alt="work" width={257} height={68} />
        </h1>
        <StSubText>
          유난한 도전을 위한 체계적인 목표 관리와 성과 트래킹, 지금 바로 문샷에서 시작해보세요
        </StSubText>
        <button type="button" onClick={handleKakaoLoginButton}>
          <img src={imgKakaoLogin} alt="kakao-login-button" width={300} height={45} />
        </button>
        <button type="button" onClick={handleGoogleLoginButton}>
          <img src={imgGoogleLogin} alt="google-login-button" width={300} height={45} />
        </button>
      </section>
      <div css={emptyContainer} />
      <section css={brandingSection} />
    </div>
  );
};

export default SignIn;

const signInContainer = css`
  position: relative;
  display: flex;
  gap: 7.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const loginSection = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  width: 42rem;
`;

const emptyContainer = css`
  flex-shrink: 0;
  min-width: 68.7rem;
  max-width: 100%;
  height: auto;
  min-height: 58.7rem;
`;

const brandingSection = css`
  position: absolute;
  top: 50%;
  right: 0;
  flex-shrink: 0;
  width: calc(50% + 7.5rem);
  min-width: 68.7rem;
  max-width: 100%;
  height: 100%;
  min-height: 58.7rem;
  background-image: url(${imgViewcollections});
  background-size: cover;
  transform: translateY(-50%);
`;

const StSubText = styled.h2`
  ${({ theme }) => theme.fonts.title_20_semibold};

  margin-bottom: 3.4rem;
  word-break: break-all;
`;
