import styled from '@emotion/styled';
const StraightLine = () => {
  return <StStraightLine />;
};

export default StraightLine;

const StStraightLine = styled.div`
  align-self: center;
  width: 3rem;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray_500};
`;
