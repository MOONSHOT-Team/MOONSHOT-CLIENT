import styled from '@emotion/styled';

export const StErrorMSG = styled.p`
  position: absolute;
  margin-top: 0.8rem;
  color: ${({ theme }) => theme.colors.sub_lightred};
  ${({ theme }) => theme.fonts.caption_10_medium};
`;
