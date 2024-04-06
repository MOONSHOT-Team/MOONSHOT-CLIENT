import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { IcDropDown } from '../../../assets/icons';
import HistoryProgressBar from '../HistoryProgressBar';

interface IShowKRType {
  isShowKR: boolean;
}

interface IHistoryObjectiveProps extends IShowKRType, ComponentProps<'div'> {
  category: string;
  objective: string;
  progress: number;
  period: string;
}

const HistoryObjective = ({
  category,
  objective,
  progress,
  period,
  isShowKR,
  ...props
}: IHistoryObjectiveProps) => {
  const { children } = props;

  return (
    <>
      <StWrapper isShowKR={isShowKR} {...props}>
        <div css={objectiveItemContentLeft}>
          <StDropDownIcon isShowKR={isShowKR} />
          <StCategory>{category}</StCategory>
          <StObjective>{objective}</StObjective>
        </div>
        <div css={objectiveItemContentRight}>
          <HistoryProgressBar currentProgress={progress} maximumProgress={100} />
          <StPeriod>{period}</StPeriod>
        </div>
      </StWrapper>
      {isShowKR && children}
    </>
  );
};

export default HistoryObjective;

const objectiveItemContentLeft = css`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

const objectiveItemContentRight = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  width: 47.8rem;
`;

const StWrapper = styled.div<IShowKRType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 105.8rem;
  height: 6rem;
  padding: 0 2.4rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border: ${({ theme, isShowKR }) =>
    isShowKR ? `1px solid ${theme.colors.gray_300}` : `1px solid ${theme.colors.gray_500}`};
  border-radius: 6px;
`;

const StDropDownIcon = styled(IcDropDown)<IShowKRType>`
  transition: all 0.5s ease;
  transform: ${({ isShowKR }) => (isShowKR ? 'rotate(-180deg)' : '')};
`;

const StCategory = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.7rem;
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.gray_150};
  background-color: ${({ theme }) => theme.colors.gray_650};
  border: 1px solid ${({ theme }) => theme.colors.gray_400};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_11_medium};
`;

const StObjective = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_14_semibold};
`;

const StPeriod = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};

  ${({ theme }) => theme.fonts.body_12_regular};
`;
