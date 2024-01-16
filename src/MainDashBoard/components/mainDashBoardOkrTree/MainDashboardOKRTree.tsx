import OkrTreeTemplate from '@components/OkrTree/Template/OkrTreeTemplate';
import { css } from '@emotion/react';

import { IMainData } from '../../type/MainDashboardDataTypes';
import { MainDashKrNodes } from './MainDashKrNodes';
import MainDashObjectNode from './MainDashObjectNode';
import { MainDashTaskNodes } from './MainDashTaskNodes';

interface IMainDashboardOKRTreeProps {
  onShowSideSheet: () => void;
  currentOkrData: IMainData;
}

const MainDashboardOKRTree = ({ onShowSideSheet, currentOkrData }: IMainDashboardOKRTreeProps) => {
  const { krList, objTitle } = currentOkrData;
  return (
    <article css={okrTreeContainer}>
      <div css={okrTree}>
        <OkrTreeTemplate
          ObjNode={() => <MainDashObjectNode objValue={objTitle} objStroke="#7165CA" />}
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
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100% - 7.6rem);
`;

const okrTree = css`
  padding: 5rem 9.8rem 5rem 5rem;
`;
