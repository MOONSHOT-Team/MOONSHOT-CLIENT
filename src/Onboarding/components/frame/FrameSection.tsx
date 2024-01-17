import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

const FrameSection = ({ children }: PropsWithChildren) => {
  return <section css={sectionStyle}>{children}</section>;
};

export default FrameSection;

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 136.6rem;
  padding: 10rem 0 14rem;
  margin: 0 auto;
`;
