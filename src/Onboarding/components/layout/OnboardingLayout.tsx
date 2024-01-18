import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import OnboardingFooter from './OnboardingFooter';
import OnboardingHeader from './OnboardingHeader';

const OnboardingLayout = () => {
  return (
    <>
      <OnboardingHeader />
      <main css={mainStyle}>
        <Outlet />
      </main>
      <OnboardingFooter />
    </>
  );
};

export default OnboardingLayout;

const mainStyle = css`
  width: 100%;
  margin-top: 7.6rem;
`;
