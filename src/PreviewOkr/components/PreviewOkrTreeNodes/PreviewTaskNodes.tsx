import DynamicInput from '@components/input/DynamicInput';
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
import { useState } from 'react';

import { IcPlusSmall } from '../../assets/icons';

export const PreviewTaskNodes = ({ isFirstChild, title, idx }: ITaskNodesTypes) => {
  const [taskValue, setTaskValue] = useState(title);
  const [isClikcedPlusBtn, setIsClickedPlusBtn] = useState(false);

  return (
    <StNodesContainer>
      {isFirstChild && <StTaskLabel>Tasks</StTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StTaskBoxWrapper>
          <StraightLine />
          {isClikcedPlusBtn ? (
            <StPreviewTaskBox $idx={idx}>
              <DynamicInput
                minWidth={'100%'}
                value={taskValue}
                handleChangeValue={(e) => setTaskValue(e.target.value)}
                isAutoFocus={true}
              />
            </StPreviewTaskBox>
          ) : (
            <StPreviewPlusBtn type="button" onClick={() => setIsClickedPlusBtn(true)}>
              <IcPlusSmall />
            </StPreviewPlusBtn>
          )}
        </StTaskBoxWrapper>
      </StTaskNodeContainer>
    </StNodesContainer>
  );
};

const StPreviewTaskBox = styled(StTaskBox)<{ $idx: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 18rem;
  padding: 0.6rem 1.6rem;
`;

const StPreviewPlusBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18rem;
  height: 3rem;
  margin: calc(1.2rem / 2) 0; /* task와 task 사이 간격 */
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 75px;
  outline: 1px solid ${({ theme }) => theme.colors.gray_500};
`;
