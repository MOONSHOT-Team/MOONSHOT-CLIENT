import imgLogo from '@assets/images/imgLogo.png';
import webpLogo from '@assets/images/webpLogo.webp';
import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';

import { NAV_ITEMS } from '../../constants/NAV_ITEMS';

const OnboardingHeader = () => {
  return (
    <StHeader>
      <picture>
        <source srcSet={webpLogo} type="image/webp" />
        <img src={imgLogo} alt="logo-img" width={126} height={28} />
      </picture>
      <nav>
        <StNavItem>
          {NAV_ITEMS.map(({ text, path }) => (
            <li key={`${text}-${path}`}>
              <StNavItemLink to={path} end>
                {text}
              </StNavItemLink>
            </li>
          ))}
          <li>
            <StCTALink to="https://tally.so/r/n0Ol0N" target="_blank" className="tally-link-button">
              서비스 신청하기
            </StCTALink>
          </li>
        </StNavItem>
      </nav>
    </StHeader>
  );
};

export default OnboardingHeader;

const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7.6rem;
  padding: 2.4rem 3.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.transparent_white};
`;

const StNavItem = styled.ul`
  display: flex;
  gap: 5rem;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray_350};

  ${({ theme }) => theme.fonts.body_14_semibold};
`;

const StNavItemLink = styled(NavLink)`
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gray_000};
  }

  &.active {
    color: ${({ theme }) => theme.colors.gray_000};
  }
`;

const StCTALink = styled(Link)`
  ${({ theme }) => theme.fonts.btn_14_semibold};

  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.9rem;
  height: 3rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.main_darkpurple};
  border-radius: 6px;
`;
