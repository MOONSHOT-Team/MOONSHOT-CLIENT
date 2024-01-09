import { ImgLogo } from '@assets/icons';
import styled from '@emotion/styled';

const Header = () => {
  return (
    <div>
      <StMainLogo>
        <ImgLogo />
      </StMainLogo>
    </div>
  );
};

export default Header;

const StMainLogo = styled.img`
  width: 100%;
`;
