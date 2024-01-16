import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const EmptyKeyResultCard = styled.article`
  display: flex;
  flex-direction: column;
  width: 34.7rem;
  height: 29.8rem;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 10px;
`;

export const CloseIconStyle = css`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
`;

export const AddOkrCardWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3.3rem;
`;
