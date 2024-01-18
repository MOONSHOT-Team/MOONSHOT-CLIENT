import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import OnboardingFooter from './OnboardingFooter';
import OnboardingHeader from './OnboardingHeader';

const OnboardingLayout = () => {
  return (
    <div css={hideScroll}>
      <OnboardingHeader />
      <main css={mainStyle}>
        <Outlet />
      </main>
      <OnboardingFooter />
    </div>
  );
};

export default OnboardingLayout;

const hideScroll = css`
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const mainStyle = css`
  width: 100%;
  margin-top: 7.6rem;
`;
