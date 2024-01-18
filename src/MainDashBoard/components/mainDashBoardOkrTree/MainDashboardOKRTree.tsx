import OkrTreeTemplate from '@components/okrTree/template/OkrTreeTemplate';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { imgNoneOkr } from '../../assets/images';
import { IMainData } from '../../type/MainDashboardDataTypes';
import { MainDashKrNodes } from './MainDashKrNodes';
import MainDashObjectNode from './MainDashObjectNode';
import { MainDashTaskNodes } from './MainDashTaskNodes';

interface IMainDashboardOKRTreeProps {
  onShowSideSheet: (keyResultId: number) => void;
  currentOkrData: IMainData;
}

const MainDashboardOKRTree = ({ onShowSideSheet, currentOkrData }: IMainDashboardOKRTreeProps) => {
  return (
    <article css={okrTreeContainer}>
      <div css={okrTree}>
        {currentOkrData ? (
          <OkrTreeTemplate
            ObjNode={() => (
              <MainDashObjectNode objValue={currentOkrData?.objTitle} objStroke="#7165CA" />
            )}
            keyResultList={currentOkrData?.krList}
            KrNodes={(krIdx) => (
              <MainDashKrNodes
                krIdx={krIdx}
                krList={currentOkrData.krList[krIdx]}
                onShowSideSheet={onShowSideSheet}
              />
            )}
            TaskNodes={(isFirstChild, krIdx, taskIdx) => (
              <MainDashTaskNodes
                isFirstChild={isFirstChild}
                taskIdx={taskIdx}
                taskList={currentOkrData.krList[krIdx]?.taskList}
              />
            )}
          />
        ) : (
          <article css={okrTreeContainer}>
            <img src={imgNoneOkr} alt="okr이 없습니다" css={{ width: '11.1rem' }} />
            <StNoneOkrText>
              <p>목표를 설정해</p>
              <p>달을 향한 첫 걸음을 시작해보세요</p>
            </StNoneOkrText>
          </article>
        )}
      </div>
    </article>
  );
};

export default MainDashboardOKRTree;

const okrTreeContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 7.6rem);
`;

const okrTree = css`
  padding: 5rem 9.8rem 5rem 5rem;
`;

const StNoneOkrText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3.44rem;
  color: ${({ theme }) => theme.colors.gray_400};
  ${({ theme }) => theme.fonts.title_20_semibold};
`;
