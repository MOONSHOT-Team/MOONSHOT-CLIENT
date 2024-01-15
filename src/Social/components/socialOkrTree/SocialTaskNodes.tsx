import NodeLines from '@components/OkrTree/lines/NodeLines';
import StraightLine from '@components/OkrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StNodesContainer,
  StTaskBox,
  StTaskBoxWrapper,
  StTaskLabel,
  StTaskNodeContainer,
} from '@styles/okrTree/CommonNodeStyle';
import { ITaskNodesTypes } from '@type/OkrTree/TasksTypes';

import { MOCK_MAIN_OKR_DATA } from '../../constants/MOCK_MAIN_OKR_DATA';

export const SocialTaskNodes = ({ isFirstChild, krIdx, taskIdx }: ITaskNodesTypes) => {
  const { title, idx } = MOCK_MAIN_OKR_DATA.krList[krIdx].taskList[taskIdx]; //krIdx번의 kr의 taskIdx task의 데이터를 다루는 tasknode

  return (
    <StNodesContainer>
      {isFirstChild && <StTaskLabel>Tasks</StTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StSocialTaskBoxWrapper>
          <StraightLine />
          <StSocialTaskBox $idx={idx}>{title}</StSocialTaskBox>
        </StSocialTaskBoxWrapper>
      </StTaskNodeContainer>
    </StNodesContainer>
  );
};

const StSocialTaskBoxWrapper = styled(StTaskBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StSocialTaskBox = styled(StTaskBox)<{ $idx: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 18rem;
  padding: 0.6rem 1.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_600};
    outline: 1px solid ${({ theme }) => theme.colors.gray_500};
  }
`;
