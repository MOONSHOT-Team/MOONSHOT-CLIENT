import OkrTreeTemplate from '@components/okrTree/template/OkrTreeTemplate';
import { css } from '@emotion/react';

import { IOkrTreeDataType } from '../../types/socialDataType';
import { SocialKrNodes } from './SocialKrNodes';
import SocialObjectNodes from './SocialObjectNode';
import { SocialTaskNodes } from './SocialTaskNodes';

const SocialOKRTree = ({ okrTreeData }: { okrTreeData: IOkrTreeDataType }) => {
  const { krList, objTitle } = okrTreeData;

  return (
    <article css={okrTreeContainer}>
      <div>
        <OkrTreeTemplate
          ObjNode={() => <SocialObjectNodes objValue={objTitle} objStroke="#7165CA" />}
          keyResultList={krList}
          KrNodes={(krIdx) => <SocialKrNodes krIdx={krIdx} krList={krList[krIdx]} />}
          TaskNodes={(isFirstChild, krIdx, taskIdx) => (
            <SocialTaskNodes
              isFirstChild={isFirstChild}
              taskIdx={taskIdx}
              taskList={okrTreeData.krList[krIdx]?.taskList}
            />
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
  width: 100%;
  height: 100%;
  margin-bottom: 7.6rem;
  margin-left: 28.3rem;
`;
