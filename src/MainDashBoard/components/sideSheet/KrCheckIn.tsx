import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

const CHECKINPLACEHOLDER =
  '회고 내용을 입력하세요.\n\n  • 목표와 주요 결과에서 얼마나 진전을 이루었나요?\n  • 이러한 목표를 선택한 것이 옳은 선택이었나요?\n  • 실행 과정에 얼마나 만족하는지 알려주세요.';

interface ICharacterCountProps {
  currentCnt: number;
  maxCnt: number;
}

/** 글자 수 띄워주는 컴포 */
const CharacterCount = ({ currentCnt, maxCnt }: ICharacterCountProps) => {
  return (
    <StCharacterCountContainer>
      {currentCnt}/{maxCnt}
    </StCharacterCountContainer>
  );
};

const StCharacterCountContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

/** 진척 정도 입력하는 뷰입니다 */
const 진척정도입력하기 = () => {
  const [logNum, setLogNum] = useState<string>('');

  const handelInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const num = Number(rawValue).toLocaleString();
    setLogNum(num);
  };
  return (
    <section css={enterLayoutStyles}>
      <article css={enterArticleStyles}>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgress">진척 정도</StLabel>
          <div css={inputBoxStyles}>
            <StEnterProgressInput
              type="text"
              id="enterProgress"
              placeholder="진척 정도를 확인할 수 있는 수치값을 입력하세요."
              value={logNum.toLocaleString()}
              onChange={handelInputChange}
            />
            {logNum && <CharacterCount currentCnt={logNum.length} maxCnt={11} />}
          </div>
        </span>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgressCheckin">체크인</StLabel>
          <div css={inputBoxStyles}>
            <StCheckInTextArea id="enterProgressCheckin" placeholder={CHECKINPLACEHOLDER} />
            <CharacterCount currentCnt={10} maxCnt={10} />
          </div>
        </span>
      </article>
      <footer css={enterFooterStyles}>
        <StEnterBtn isActiveBtn={false} isCancel={true}>
          취소
        </StEnterBtn>
        <StEnterBtn isActiveBtn={true} isCancel={false}>
          체크인 완료
        </StEnterBtn>
      </footer>
    </section>
  );
};

/** kr을 수정하는 뷰입니다 */
const 케이알수정하기 = () => {
  return (
    <section css={enterLayoutStyles}>
      <article css={enterArticleStyles}>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgress">kr 수정</StLabel>
          <StEditNum>
            <span>통합 가입 수</span>
            <StEditNumInput id="enterProgress" placeholder="200,000" />
            <span>건 돌파</span>
          </StEditNum>
        </span>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgressCheckin">체크인</StLabel>
          <StCheckInTextArea id="enterProgressCheckin" placeholder={CHECKINPLACEHOLDER} />
        </span>
      </article>
      <footer css={enterFooterStyles}>
        <StEnterBtn isActiveBtn={false} isCancel={true}>
          취소
        </StEnterBtn>
        <StEnterBtn isActiveBtn={true} isCancel={false}>
          체크인 완료
        </StEnterBtn>
      </footer>
    </section>
  );
};

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
      {isActive === '진척 정도 입력하기' ? <진척정도입력하기 /> : <케이알수정하기 />}
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
    color: ${({ theme }) => theme.colors.sub_mint};
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
  margin-top: 5rem;
`;

const StEnterBtn = styled.button<{ isActiveBtn: boolean; isCancel: boolean }>`
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

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_350};
    ${({ theme }) => theme.fonts.body_12_regular};
  }
`;

const enterInputBoxStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StCheckInTextArea = styled.textarea`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 17.7rem;
  padding: 1.1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  word-break: keep-all;
  resize: none;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;
  ${({ theme }) => theme.fonts.body_12_medium};

  &:focus {
    outline: none;
  }

  &::placeholder {
    ${({ theme }) => theme.fonts.body_12_regular};
  }
`;

const StEditNum = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const StEditNumInput = styled.input`
  width: 12rem;
  padding: 1.1rem 1.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  text-align: center;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_12_medium};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_350};
    ${({ theme }) => theme.fonts.body_12_regular};
  }
`;

const inputBoxStyles = css`
  position: relative;
`;
