import { ImgLogo } from '@assets/icons';
import { NAVIGATIONS } from '@constants/NavigationLink';
import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <StHeader>
      <StMainLogo>
        <ImgLogo />
      </StMainLogo>
      <StNavigationBar>
        {NAVIGATIONS.map(({ id, text, path }) => (
          <StNavigation key={id}>
            <NavLink
              to={path}
              style={({ isActive }) => {
                return { color: isActive ? 'white' : '' };
              }}
            >
              {text}
            </NavLink>
          </StNavigation>
        ))}

        <StSignInButton>
          <Link to="/sign-in">로그인</Link>
        </StSignInButton>
      </StNavigationBar>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 7.6rem;
  padding: 0 3.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.transparent_white};
`;
const StMainLogo = styled.div`
  width: 150%;
`;

const StNavigationBar = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const StNavigation = styled.li`
  display: flex;
  gap: 5rem;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_14_regular};
`;
const StSignInButton = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.8rem;
  height: 3rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.btn_14_semibold};

  background-color: ${({ theme }) => theme.colors.main_darkpurple};
  border-radius: 6px;
`;
