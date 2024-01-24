import instance from '@apis/instance';
import { IcLogo } from '@assets/icons';
import { NAVIGATION_LIST } from '@constants/NAVIGATION_LIST';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await instance.post('/v1/user/log-out');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');

    navigate('/');
  };

  return (
    <StHeader>
      <Link to="/">
        <IcLogo />
      </Link>
      <StNavigationBar>
        {NAVIGATION_LIST.map(({ id, text, path }) => (
          <StNavigation key={`${id}-${text}-${path}`}>
            <StNavStyle to={path}>{text}</StNavStyle>
          </StNavigation>
        ))}
        {!ACCESS_TOKEN && <StSignInLink to="/sign-in">로그인</StSignInLink>}
        {ACCESS_TOKEN && <StSignOutButton onClick={handleSignOut}>로그아웃</StSignOutButton>}
      </StNavigationBar>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 7.6rem;
  padding: 0 3.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.transparent_white};
`;

const StNavigationBar = styled.ol`
  display: flex;
  gap: 5rem;
  align-items: center;
`;

const StNavigation = styled.li`
  display: flex;
  color: ${({ theme }) => theme.colors.gray_350};
  transition: all 0.3s ease;

  ${({ theme }) => theme.fonts.body_14_regular};

  &:hover {
    color: ${({ theme }) => theme.colors.gray_000};
  }
`;

const StNavStyle = styled(NavLink)`
  &.active {
    color: ${({ theme }) => theme.colors.gray_000};
  }
`;

const signInLink = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.8rem;
  height: 3rem;
  border-radius: 6px;
`;

const StSignInLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.main_darkpurple};

  ${signInLink}
  ${({ theme }) => theme.fonts.btn_14_semibold};
`;

const StSignOutButton = styled.button`
  color: ${({ theme }) => theme.colors.gray_300};
  background-color: ${({ theme }) => theme.colors.gray_550};

  ${signInLink}
  ${({ theme }) => theme.fonts.btn_14_semibold};
`;
