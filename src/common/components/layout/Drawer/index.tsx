import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

const Drawer = () => {
  return (
    <div css={drawerStyle}>
      <div>Drawer</div>
      <Outlet />
    </div>
  );
};

const drawerStyle = css`
  display: flex;
  gap: 2rem;
`;

export default Drawer;
