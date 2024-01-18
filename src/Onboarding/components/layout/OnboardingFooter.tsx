import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import imgLogoForFooter from '../../assets/imgLogoForFooter.png';

const OnboardingFooter = () => {
  return (
    <footer css={footer}>
      <img css={logo} src={imgLogoForFooter} alt="footer-logo" width={110} height={25} />
      <FooterText to="#">TEAM moonshot</FooterText>
      <FooterText to="#">개인정보 처리방침</FooterText>
      <CopyRightText>Copyright 2024. TEAM moonshot All rights reserved.</CopyRightText>
    </footer>
  );
};

export default OnboardingFooter;

const footer = css`
  display: flex;
  align-items: center;
  width: 100vw;

  /* min-width: 136.6rem; */
  height: 13.2rem;
  padding: 5.4rem 10rem 5.3rem;
`;

const logo = css`
  margin-right: 8.4rem;
`;

const FooterText = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  height: 4.4rem;
  margin-right: 2.3rem;
  color: ${({ theme }) => theme.colors.gray_200};

  ${({ theme }) => theme.fonts.body_14_regular};
`;

const CopyRightText = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.gray_400};

  ${({ theme }) => theme.fonts.body_14_regular};
`;
