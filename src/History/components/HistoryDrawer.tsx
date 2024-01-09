import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { THEME } from '../constants/theme';
import ThemeButton from './ThemeButton';

const HistoryDrawer = () => {
  return (
    <aside css={historyAside}>
      <ThemeContainer>
        <Theme>테마</Theme>
        <ThemeWrapper>
          {THEME.map(({ text }, idx) => (
            <ThemeButton key={idx} name={text} />
          ))}
        </ThemeWrapper>
      </ThemeContainer>
      <YearContainer>
        <Year>연도</Year>
        <YearWrapper>
          <YearButton>2023(5)</YearButton>
          <YearButton>2022(3)</YearButton>
          <YearButton>2021(1)</YearButton>
        </YearWrapper>
      </YearContainer>
    </aside>
  );
};

export default HistoryDrawer;

const historyAside = css`
  position: absolute;
  top: 7.6rem;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2.4rem 2.2rem 27.8rem;
`;

const ThemeContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Theme = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const ThemeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 0.6rem;
`;

const YearContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Year = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
const YearWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 0.6rem;
`;
const YearButton = styled.button`
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.btn_11_semibold};

  border: 1px solid ${({ theme }) => theme.colors.gray_350};
  border-radius: 6px;
`;
