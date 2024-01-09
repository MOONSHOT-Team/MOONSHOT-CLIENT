import styled from '@emotion/styled';

const KrStatus = () => {
  return (
    <StContainer>
      <></>
    </StContainer>
  );
};

export default KrStatus;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 7.4rem;
  height: 2.4rem;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 3px;
`;
