import styled from '@emotion/styled';

export const ObjectiveNodes = () => {
  return (
    <StNodesContainer>
      <StObjectiveLabel>O</StObjectiveLabel>
      <StObjectiveBox>
        <StOBoxText>더 많은 구매 전환을 일으키는 높은 품질의 웹사이트를 런칭한다</StOBoxText>
      </StObjectiveBox>
    </StNodesContainer>
  );
};

export const KeyResultNodes = () => {
  return (
    <StNodesContainer>
      <StKrLabel>KR 1</StKrLabel>
      <StKrBox>
        {/*여기 children으로 넣을수 있게 추상화로 수정 필요 */}
        구매 전환 30% 증가
      </StKrBox>
    </StNodesContainer>
  );
};

export const TaskNodes = ({ isFirstChild = false }: { isFirstChild?: boolean }) => {
  return (
    <>
      <StNodesContainer>
        {isFirstChild && <StTaskLabel>Task</StTaskLabel>}
        {/* 여기 부분 children으로 추상화 필요 */}
        <StTaskBox>task 1</StTaskBox>
      </StNodesContainer>
    </>
  );
};

/* style definition */
//common
const StNodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

//Objective
const StObjectiveLabel = styled.span`
  margin-left: 3.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};
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
  margin-left: 2.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};
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
  margin-left: 1.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};
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
