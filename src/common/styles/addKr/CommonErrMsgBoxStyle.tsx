import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const AddKrInputMsgWrapper = css`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const StAddKrErrMsg = styled.p`
  position: absolute;
  bottom: -1.9rem;
  color: ${({ theme }) => theme.colors.sub_lightred};

  ${({ theme }) => theme.fonts.caption_10_medium};
`;
