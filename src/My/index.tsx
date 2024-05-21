import { css } from '@emotion/react';

import Badges from './components/Badges';
import Footer from './components/Footer';
import UserInfo from './components/UserInfo';

const My = () => {
  return (
    <>
      <section css={myPageUi}>
        <UserInfo />
        <Badges />
      </section>
      <Footer />
    </>
  );
};

export default My;

const myPageUi = css`
  display: flex;
  height: calc(100% - 9rem);
`;
