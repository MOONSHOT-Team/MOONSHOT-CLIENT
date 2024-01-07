import styled from '@emotion/styled';

import NodeLines from '../Lines/NodeLines';
import StraightLine from '../Lines/StraightLine';

export const ObjectiveNodes = ({ title }: { title: string }) => {
  return (
    <StNodesContainer>
      <StObjLabel>O</StObjLabel>
      <StObjBoxWrapper>
        <StObjectiveBox>
          <StOBoxText>{title}</StOBoxText>
        </StObjectiveBox>
        <StraightLine />
      </StObjBoxWrapper>
    </StNodesContainer>
  );
};

interface IKeyResultNodesProps {
  idx: number;
  title: string;
}

export const KeyResultNodes = ({ idx, title }: IKeyResultNodesProps) => {
  return (
    <StNodesContainer>
      <StKrLabel>KR {idx + 1}</StKrLabel>
      <StKrBoxWrapper>
        <StraightLine />
        <StKrBox>
          {/*여기 children으로 넣을수 있게 추상화로 수정 필요 */}
          {title}
        </StKrBox>
      </StKrBoxWrapper>
    </StNodesContainer>
  );
};

interface ITaskNodesProps {
  isFirstChild?: boolean;
  title: string;
}

export const TaskNodes = ({ isFirstChild, title }: ITaskNodesProps) => {
  return (
    <StNodesContainer>
      {isFirstChild && <StTaskLabel>Task</StTaskLabel>}
      {/* 여기 부분 children으로 추상화 필요 */}
      <StTaskNodeContainer>
        <NodeLines />
        <StTaskBoxWrapper>
          <StraightLine />
          <StTaskBox>{title}</StTaskBox>
        </StTaskBoxWrapper>
      </StTaskNodeContainer>
    </StNodesContainer>
  );
};

/* style definition */
//common
const StNodesContainer = styled.div`
  position: relative;

  /* display: flex;
  flex-direction: column;
  gap: 0.4rem; */
`;

//Objective
const StObjLabel = styled.span`
  position: absolute;
  top: -2.2rem;
  left: 3.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};
`;

const StObjBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StObjectiveBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 21.6rem;
  padding: 1.4rem 2.4rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 75px;
  outline: 1px solid ${({ theme }) => theme.colors.gray_500};
`;

const StOBoxText = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_13_medium};
  word-break: keep-all;
`;

// KeyResult
const StKrLabel = styled.span`
  position: absolute;
  top: -2.2rem;
  left: 5.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};
`;

const StKrBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StKrBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 1.4rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 75px;
  outline: 1px solid ${({ theme }) => theme.colors.gray_500};
`;

//Task
const StTaskLabel = styled.span`
  position: absolute;
  top: -2.2rem;
  left: 4.7rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};
`;

const StTaskNodeContainer = styled.div`
  display: flex;
`;
const StTaskBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StTaskBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14.4rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 75px;
  outline: 1px solid ${({ theme }) => theme.colors.gray_500};
`;
