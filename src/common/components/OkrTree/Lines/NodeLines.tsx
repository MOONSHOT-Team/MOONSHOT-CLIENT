import styled from '@emotion/styled';
const NodeLines = () => {
  return (
    <StNodeLineContainer>
      <StNodeLines />
      <StNodeMLine />
      <StNodeLines />
    </StNodeLineContainer>
  );
};

export default NodeLines;

const StNodeLineContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StNodeLines = styled.div`
  flex: 1;
  width: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray_500};
`;

const StNodeMLine = styled.div`
  width: 0.1rem;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray_500};
`;
