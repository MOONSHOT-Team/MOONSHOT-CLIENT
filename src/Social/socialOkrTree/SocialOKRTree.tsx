import { css } from '@emotion/react';

const SocialOKRTree = () => {
  return <article css={okrTreeContainer}>okr트리</article>;
};

export default SocialOKRTree;

const okrTreeContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 7.6rem);
  margin-right: 23.2rem;
  margin-bottom: 7.6rem;
`;
