import styled from '@emotion/styled/macro';

export const StMainDashObjP = styled.p`
  min-width: 21rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_13_medium};

  word-break: break-all;
`;
