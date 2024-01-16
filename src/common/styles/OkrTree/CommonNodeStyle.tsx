import styled from '@emotion/styled';

//common (label, 노드 박스 container)
export const StNodesContainer = styled.div`
  position: relative;
`;

// KeyResult
export const StKrLabel = styled.span`
  position: absolute;
  top: -2.2rem;
  left: 5.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};
`;

export const StKrBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StKrBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 1.4rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 75px;
  outline: 1px solid ${({ theme }) => theme.colors.gray_500};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
    outline: 1px solid ${({ theme }) => theme.colors.gray_500};
  }
`;

//Task
export const StTaskLabel = styled.span`
  position: absolute;
  top: -2.2rem;
  left: 4.7rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};
`;

export const StTaskNodeContainer = styled.div`
  display: flex;
`;
export const StTaskBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StTaskBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14.4rem;
  height: 3rem;
  margin: calc(1.2rem / 2) 0; /* task와 task 사이 간격 */
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 75px;
  outline: 1px solid ${({ theme }) => theme.colors.gray_500};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
    outline: 1px solid ${({ theme }) => theme.colors.gray_500};
  }
`;
