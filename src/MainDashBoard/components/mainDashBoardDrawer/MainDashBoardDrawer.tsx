import styled from '@emotion/styled';

const MainDashBoardDrawer = () => {
  return <StContainer>MainDashBoardDrawer</StContainer>;
};

export default MainDashBoardDrawer;

const StContainer = styled.aside`
  min-width: 23.2rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray_600};
`;
