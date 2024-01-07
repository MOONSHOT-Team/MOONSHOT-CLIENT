import styled from '@emotion/styled';
import React from 'react';

const MainDashBoardDrawer: React.FC = () => {
  return <StContainer>MainDashBoardDrawer</StContainer>;
};

export default MainDashBoardDrawer;

const StContainer = styled.aside`
  min-width: 23.2rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid red;
`;
