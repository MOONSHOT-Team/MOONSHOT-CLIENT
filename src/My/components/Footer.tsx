import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import imgLogoForFooter from '../assets/images/imgLogoForFooter.png';
import { FOOTER_LIST } from '../constants/FOOTER_LIST';

const Footer = () => {
  return (
    <StFooter>
      <img src={imgLogoForFooter} alt="footer-logo" width={110} height={25} loading="lazy" />
      {FOOTER_LIST.map(({ label, url, newTab, isBold }) => (
        <StFooterText key={label} to={url} target={newTab ? '_blank' : '_self'} isBold={isBold}>
          {label}
        </StFooterText>
      ))}
      <StCopyRightText>&copy; 2024 moonshot</StCopyRightText>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.footer`
  position: relative;
  display: flex;
  gap: 2.6rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9rem;
  background-color: #0f0f0f;
`;

const StFooterText = styled(Link)<{ isBold: boolean }>`
  ${({ theme }) => theme.fonts.body_13_medium};

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ isBold }) => (isBold ? '700' : '500')};
  color: ${({ theme }) => theme.colors.gray_450};
`;

const StCopyRightText = styled.span`
  position: absolute;
  top: 50%;
  right: 4%;
  color: ${({ theme }) => theme.colors.gray_400};
  transform: translateY(-50%);

  ${({ theme }) => theme.fonts.body_13_medium};
`;
