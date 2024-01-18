import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

import { KR수정하기, 진척정도입력하기 } from './KrCheckInInputs';

interface IKrCheckInProps {
  onCancel: () => void;
  keyResultId: number;
  title: string;
  target: number;
  metric: string;
  handleChangeState?: (state: number) => void;
}

/** 체크인을 할 수 있는 뷰 입니다 (진척정도입력, kr수정) */
const KrCheckIn = ({
  onCancel,
  keyResultId,
  title,
  target,
  metric,
  handleChangeState,
}: IKrCheckInProps) => {
  const [isActive, setIsActive] = useState('진척 정도 입력하기');

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsActive(e.target.value);
  };
  return (
    <KrCheckInContainer>
      <div css={checkRadioContainerStyles}>
        <StRadioLabel htmlFor="krCheckInput">
          <StRadioInput
            id="krCheckInput"
            type="radio"
            name="krCheck"
            value={'진척 정도 입력하기'}
            defaultChecked
            onChange={handleRadioChange}
          />
          <StRadioSpan>진척 정도 입력하기</StRadioSpan>
        </StRadioLabel>
        <StRadioLabel htmlFor="krCheckEdit">
          <StRadioInput
            id="krCheckEdit"
            type="radio"
            name="krCheck"
            value={'kr 수정하기'}
            onChange={handleRadioChange}
          />
          <StRadioSpan>KR 수정하기</StRadioSpan>
        </StRadioLabel>
      </div>
      {isActive === '진척 정도 입력하기' ? (
        <진척정도입력하기
          onCancel={onCancel}
          keyResultId={keyResultId}
          handleChangeState={handleChangeState}
        />
      ) : (
        <KR수정하기
          onCancel={onCancel}
          keyResultId={keyResultId}
          title={title}
          target={target}
          metric={metric}
          handleChangeState={handleChangeState}
        />
      )}
    </KrCheckInContainer>
  );
};

export default KrCheckIn;

const KrCheckInContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray_550};
`;

const checkRadioContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StRadioLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 4.7rem;
  cursor: pointer;
`;

const StRadioInput = styled.input`
  display: none;
`;
const StRadioSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.fonts.body_12_medium};

  width: 100%;
  height: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.transparent_white};
  ${StRadioInput}:checked + & {
    color: ${({ theme }) => theme.colors.sub_mint};
    border-bottom: 2px solid ${({ theme }) => theme.colors.sub_mint};
  }
`;
