import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface IKeyResultProps {
  krIdx: number;
  krProgress: number;
  krTitle: string;
}

const KeyResultList = ({ krIdx, krProgress, krTitle }: IKeyResultProps) => {
  return (
    <>
      <StKeyResultContainer>
        <StKeyResultWrapper>
          <StOKRIndex>KR {krIdx + 1}</StOKRIndex>
          <StOKRContent>{krTitle}</StOKRContent>
        </StKeyResultWrapper>
        <StKeyResultProgressBar>
          <div css={KrProgressBar}>
            <ProgressBar currentProgress={krProgress} maximumProgress={100} />
          </div>
          {krProgress}% 달성
        </StKeyResultProgressBar>
      </StKeyResultContainer>
    </>
  );
};

export default KeyResultList;

const StKeyResultContainer = styled.article`
  display: flex;
  align-items: center;
  width: 105.8rem;
  height: 5.2rem;
  list-style-type: none;
  background: ${({ theme }) => theme.colors.gray_550};
  border-radius: 6px;
`;

const StKeyResultWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  width: 44.6rem;
  padding-left: 2rem;
`;

const StKeyResultProgressBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: center;
  width: 27.6rem;
  margin-left: 11rem;
  ${({ theme }) => theme.fonts.body_13_medium};

  color: ${({ theme }) => theme.colors.gray_300};
`;

const KrProgressBar = css`
  width: 20rem;
`;

const StOKRIndex = styled.p`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ theme }) => theme.colors.gray_000};
`;

const StOKRContent = styled.p`
  ${({ theme }) => theme.fonts.body_14_regular};

  color: ${({ theme }) => theme.colors.gray_000};
`;
