import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import imgLogoForFooter from '../../assets/imgLogoForFooter.png';

const OnboardingFooter = () => {
  return (
    <StFooter>
      <img css={logo} src={imgLogoForFooter} alt="footer-logo" width={110} height={25} />
      <StFooterText to="/team-moonshot">TEAM moonshot</StFooterText>
      <StFooterText to="#">개인정보 처리방침</StFooterText>
      <StCopyRightText>Copyright 2024. TEAM moonshot All rights reserved.</StCopyRightText>
    </StFooter>
  );
};

export default OnboardingFooter;

const logo = css`
  margin-right: 8.4rem;
`;

const StFooter = styled.footer`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 13.2rem;
  padding: 5.4rem 10rem 5.3rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_550};
`;

const StFooterText = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  height: 4.4rem;
  margin-right: 2.3rem;
  color: ${({ theme }) => theme.colors.gray_200};

  ${({ theme }) => theme.fonts.body_14_regular};
`;

const StCopyRightText = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.gray_400};

  ${({ theme }) => theme.fonts.body_14_regular};
`;
