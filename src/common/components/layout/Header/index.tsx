import { IcLogo } from '@assets/icons';
import { NAVIGATIONS } from '@constants/NavigationLink';
import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <StHeader>
      <Link to="/">
        <IcLogo />
      </Link>
      <StNavigationBar>
        {NAVIGATIONS.map(({ id, text, path }) => (
          <StNavigation key={id}>
            <NavStyle to={path}>{text}</NavStyle>
          </StNavigation>
        ))}
        <StSignInButton to="/sign-in">로그인</StSignInButton>
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
  ${({ theme }) => theme.fonts.body_14_regular};
`;

const NavStyle = styled(NavLink)`
  &.active {
    color: ${({ theme }) => theme.colors.gray_000};
  }
`;

const StSignInButton = styled(Link)`
  padding: 0.8rem 2.05rem;
  margin: 2rem 0 2.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.btn_14_semibold};

  text-align: center;
  background-color: ${({ theme }) => theme.colors.main_darkpurple};
  border-radius: 6px;
`;
