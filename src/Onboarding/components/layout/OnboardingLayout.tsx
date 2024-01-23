import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import OnboardingHeader from './OnboardingHeader';

const OnboardingLayout = () => {
  return (
    <>
      <OnboardingHeader />
      <main css={mainStyle}>
        <Outlet />
      </main>
    </>
  );
};

export default OnboardingLayout;

const mainStyle = css`
  width: 100%;
  margin-top: 7.6rem;
`;
