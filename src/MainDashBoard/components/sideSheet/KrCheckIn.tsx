import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

/** 진척 정도 입력하는 뷰입니다 */
const 진척정도입력하기 = () => {
  return (
    <section css={enterLayoutStyles}>
      <article css={enterArticleStyles}>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgress">진척 정도 입력하기</StLabel>
          <StEnterProgressInput id="enterProgress" />
        </span>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgressCheckin">체크인</StLabel>
          <input id="enterProgressCheckin" />
        </span>
      </article>
      <footer css={enterFooterStyles}>
        <EnterBtn isActiveBtn={false} isCancel={true}>
          취소
        </EnterBtn>
        <EnterBtn isActiveBtn={true} isCancel={false}>
          체크인 완료
        </EnterBtn>
      </footer>
    </section>
  );
};

const StEnterProgressInput = styled.input`
  width: 100%;
  padding: 1.1rem 1.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_12_medium};

  &:focus {
    outline: none;
  }
`;

const enterInputBoxStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/** 체크인을 할 수 있는 뷰 입니다 (진척정도입력, kr수정) */
const KrCheckIn = () => {
  const [isActive, setIsActive] = useState('진척 정도 입력하기');

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsActive(e.target.value);
  };
  return (
    <KrCheckInContainer>
      <div css={checkRadioContainerStyles}>
        <StRadiodLabel htmlFor="krCheckInput">
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
        <StRadiodLabel htmlFor="krCheckEdit">
          <StRadioInput
            id="krCheckEdit"
            type="radio"
            name="krCheck"
            value={'kr 수정하기'}
            onChange={handleRadioChange}
          ></StRadioInput>
          <span>kr 수정하기</span>
        </StRadiodLabel>
      </div>
      {isActive === '진척 정도 입력하기' ? <진척정도입력하기 /> : <div>kr 수정</div>}
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
    border-bottom: 2px solid ${({ theme }) => theme.colors.transparent_white};
  }

  &:checked + span {
    border-bottom: 2px solid ${({ theme }) => theme.colors.sub_mint};
  }
`;

const enterLayoutStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 2rem 2.2rem 3.6rem;
`;

const enterArticleStyles = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const enterFooterStyles = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const EnterBtn = styled.button<{ isActiveBtn: boolean; isCancel: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14.5rem;
  height: 3rem;
  color: ${({ theme, isCancel }) => (isCancel ? theme.colors.gray_000 : theme.colors.gray_600)};
  background-color: ${({ theme, isCancel }) =>
    isCancel ? theme.colors.gray_500 : theme.colors.sub_mint};
  ${({ theme }) => theme.fonts.btn_14_semibold};

  border-radius: 6px;
`;

const StLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};
`;
