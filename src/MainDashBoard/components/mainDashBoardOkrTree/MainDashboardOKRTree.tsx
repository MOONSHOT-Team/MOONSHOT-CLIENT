import OkrTreeTemplate from '@components/OkrTree/Template/OkrTreeTemplate';
import { css } from '@emotion/react';

import { MOCK_MAIN_OKR_DATA } from '../../constants/MOCK_MAIN_OKR_DATA';
import { MainDashKrNodes } from './MainDashKrNodes';
import MainDashObjectNode from './MainDashObjectNode';
import { MainDashTaskNodes } from './MainDashTaskNodes';

interface IMainDashboardOKRTreeProps {
  onShowSideSheet: () => void;
}

const MainDashboardOKRTree = ({ onShowSideSheet }: IMainDashboardOKRTreeProps) => {
  const { krList } = MOCK_MAIN_OKR_DATA;
  return (
    <article css={okrTreeContainer}>
      <div css={okrTree}>
        <OkrTreeTemplate
          ObjNode={() => (
            <MainDashObjectNode
              objValue="더 많은 구매 전환을 일으키는 웹사이트를 런칭한다 "
              objStroke="#7165CA"
            />
          )}
          keyResultList={krList}
          KrNodes={(krIdx) => <MainDashKrNodes krIdx={krIdx} onShowSideSheet={onShowSideSheet} />}
          TaskNodes={(isFirstChild, krIdx, taskIdx) => (
            <MainDashTaskNodes isFirstChild={isFirstChild} krIdx={krIdx} taskIdx={taskIdx} />
          )}
        />
      </div>
    </article>
  );
};

export default MainDashboardOKRTree;

const okrTreeContainer = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const okrTree = css`
  padding: 5rem 9.8rem 5rem 5rem;
`;
