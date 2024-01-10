import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

/** 진척 정도 입력하는 뷰입니다 */

/** 체크인을 할 수 있는 뷰 입니다 (진척상황입력, kr수정) */
const KrCheckIn = () => {
  const [isActive, setIsActive] = useState('진척 정도 입력하기');

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setIsActive(e.target.value);
  };
  return (
    <div>
      <form css={checkRadioContainerStyles}>
        <StRadiodLabel htmlFor="krCheckInput" css={checkRadioStyles}>
          <StRadioInput
            id="krCheckInput"
            type="radio"
            name="krCheck"
            value={'진척 정도 입력하기'}
            defaultChecked
            onChange={handleRadioChange}
          ></StRadioInput>
          <span>진척 정도 입력하기</span>
        </StRadiodLabel>
        <StRadiodLabel htmlFor="krCheckEdit" css={checkRadioStyles}>
          <StRadioInput
            id="krCheckEdit"
            type="radio"
            name="krCheck"
            value={'kr 수정하기'}
            onChange={handleRadioChange}
          ></StRadioInput>
          <span>kr 수정하기</span>
        </StRadiodLabel>
      </form>
      {isActive === '진척 정도 입력하기' ? <div>아래부분</div> : <div>kr 수정</div>}
    </div>
  );
};

export default KrCheckIn;

const checkRadioContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StRadiodLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 4.7rem;
  cursor: pointer;
`;

const StRadioInput = styled.input`
  display: none;

  + span {
    display: flex;
    align-items: center;
    justify-content: center;

    ${({ theme }) => theme.fonts.body_12_medium};

    width: 100%;
    height: 100%;
  }

  &:checked + span {
    border-bottom: 2px solid ${({ theme }) => theme.colors.sub_mint};
  }
`;

const checkRadioStyles = css`
  display: flex;
`;
