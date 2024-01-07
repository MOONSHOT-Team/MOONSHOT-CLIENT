import styled from '@emotion/styled';
import React from 'react';

/* main dashboard에서 kr클릭 시 오른쪽에서 나오는 side sheet입니다. */

const SideSheet: React.FC = () => {
  return <StContainer>sidesheet</StContainer>;
};

export default SideSheet;

const StContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 34.2rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray_600};
`;
