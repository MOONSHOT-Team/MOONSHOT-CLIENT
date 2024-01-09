import { ImgLogo } from '@assets/icons';
import styled from '@emotion/styled';

const Header = () => {
  return (
    <StHeader>
      <StMainLogo>
        <ImgLogo />
      </StMainLogo>
      <StNavigationBar>
        <StNavigation>대쉬보드</StNavigation>
        <StNavigation>히스토리</StNavigation>
        <StNavigation>소셜</StNavigation>
        <StNavigation>My</StNavigation>
        <StSignInButton>로그인</StSignInButton>
      </StNavigationBar>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 7.6rem;
  padding: 0 3.5rem;
`;
const StMainLogo = styled.div`
  width: 150%;
`;

const StNavigationBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const StNavigation = styled.nav`
  display: flex;
  gap: 5rem;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_14_regular};
`;
const StSignInButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.8rem;
  height: 3rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.btn_14_semibold};

  background-color: ${({ theme }) => theme.colors.main_darkpurple};
  border-color: ${({ theme }) => theme.colors.transparent_white};
  border-bottom: 1px solid;
  border-radius: 6px;
`;
