import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

interface IHistoryKeyResultProps extends ComponentProps<'div'> {
  index: number;
  keyResult: string;
  progress: number;
}

const HistoryKeyResult = ({ index, keyResult, progress, children }: IHistoryKeyResultProps) => {
  return (
    <>
      <StKeyResultWrapper>
        <div css={keyResultItemContentLeft}>
          <StKeyResultIndex>KR {index + 1}</StKeyResultIndex>
          <StKeyResult>{keyResult}</StKeyResult>
        </div>
        <div css={keyResultItemContentRight}>
          <div css={keyResultProgressbar}>
            <ProgressBar currentProgress={progress} maximumProgress={100} />
          </div>
          <StKeyResultProgressNumber>{progress}% 달성</StKeyResultProgressNumber>
        </div>
      </StKeyResultWrapper>
      {children && <div css={taskAlign}>{children}</div>}
    </>
  );
};

export default HistoryKeyResult;

const keyResultItemContentLeft = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const keyResultItemContentRight = css`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 27.6rem;
  margin-right: 18.6rem;
`;

const keyResultProgressbar = css`
  width: 20rem;
`;

const taskAlign = css`
  display: flex;
  gap: 1.9rem;
  align-items: center;
`;

const StKeyResultWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 105.8rem;
  height: 5.2rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.colors.gray_550};
  border-radius: 6px;
`;

const StKeyResultIndex = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.btn_11_medium};
`;

const StKeyResult = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_14_regular};
`;

const StKeyResultProgressNumber = styled.span`
  color: ${({ theme }) => theme.colors.gray_300};

  ${({ theme }) => theme.fonts.body_13_medium};
`;
