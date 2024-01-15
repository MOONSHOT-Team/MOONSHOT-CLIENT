import OkrTreeTemplate from '@components/OkrTree/template/OkrTreeTemplate';
import { css } from '@emotion/react';

import { IOkrTreeDataType } from '../../types/socialDataType';
import { SocialKrNodes } from './SocialKrNodes';
import SocialObjectNodes from './SocialObjectNode';
import { SocialTaskNodes } from './SocialTaskNodes';

const SocialOKRTree = ({ okrData }: { okrData: IOkrTreeDataType }) => {
  const { krList, objTitle } = okrData;
  console.log(krList);
  return (
    <article css={okrTreeContainer}>
      <div>
        <OkrTreeTemplate
          ObjNode={() => <SocialObjectNodes objValue={objTitle} objStroke="#7165CA" />}
          keyResultList={krList}
          KrNodes={(krIdx) => <SocialKrNodes krIdx={krIdx} krList={krList} />}
          TaskNodes={(isFirstChild, krIdx, taskIdx) => (
            <SocialTaskNodes isFirstChild={isFirstChild} krIdx={krIdx} taskIdx={taskIdx} />
          )}
        />
      </div>
    </article>
  );
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
