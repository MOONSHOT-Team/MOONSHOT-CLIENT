import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { limitMaxLength } from '@utils/limitMaxLength';
import { ChangeEvent, useEffect, useState } from 'react';

const CHECKINPLACEHOLDER =
  '회고 내용을 입력하세요.\n\n  • 목표와 주요 결과에서 얼마나 진전을 이루었나요?\n  • 이러한 목표를 선택한 것이 옳은 선택이었나요?\n  • 실행 과정에 얼마나 만족하는지 알려주세요.';

interface ICharacterCountProps {
  currentCnt: number;
  maxCnt: number;
}

/** 글자 수 띄워주는 컴포넌트 입니다*/
const CharacterCount = ({ currentCnt, maxCnt }: ICharacterCountProps) => {
  return (
    <StCharacterCountContainer>
      {currentCnt}/{maxCnt}
    </StCharacterCountContainer>
  );
};

interface ICheckInInputProps {
  logContent: string;
  handleLogContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  logContentCount: number;
}
/** 체크인 회고 Input 컴포넌트입니다*/
const CheckInInput = ({
  logContent,
  handleLogContentChange,
  logContentCount,
}: ICheckInInputProps) => {
  return (
    <span css={enterInputBoxStyles}>
      <StLabel htmlFor="enterProgressCheckin">체크인</StLabel>
      <div css={inputBoxStyles}>
        <StCheckInTextArea
          id="enterProgressCheckin"
          placeholder={CHECKINPLACEHOLDER}
          value={logContent}
          onChange={handleLogContentChange}
        />
        {logContent && <CharacterCount currentCnt={logContentCount} maxCnt={100} />}
      </div>
    </span>
  );
};

/** 진척 정도 입력하는 뷰입니다 */
export const 진척정도입력하기 = () => {
  const [logNum, setLogNum] = useState('');
  const [logContent, setLogContent] = useState('');
  const [logContentCount, setLogContentCount] = useState(0);
  const [isActiveBtn, setIsActiveBtn] = useState(false);

  useEffect(() => {
    logNum && logContent ? setIsActiveBtn(true) : setIsActiveBtn(false);
  }, [logNum, logContent]);

  const handleLogNumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '').slice(0, 11);
    if (/^\d*$/.test(rawValue)) {
      const num = Number(rawValue).toLocaleString();
      setLogNum(num);
    }
  };

  const handleLogContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setLogContentCount(0);
      setLogContent('');
    }
    const lengthCount = limitMaxLength(e, 100);

    if (!lengthCount) return;
    setLogContentCount(lengthCount);
    setLogContent(e.target.value);
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
              onChange={handleLogNumChange}
            />
          </div>
        </span>
        <CheckInInput
          logContent={logContent}
          handleLogContentChange={handleLogContentChange}
          logContentCount={logContentCount}
        />
      </article>
      <footer css={enterFooterStyles}>
        <StCnclBtn>취소</StCnclBtn>
        <StEnterBtn1 isActiveBtn={isActiveBtn}>체크인 완료</StEnterBtn1>
      </footer>
    </section>
  );
};

/** kr을 수정하는 뷰입니다 */
export const KR수정하기 = () => {
  const [target, setTarget] = useState('');
  const [logContent, setLogContent] = useState('');
  const [logContentCount, setLogContentCount] = useState(0);
  const [isActiveBtn, setIsActiveBtn] = useState(false);

  const handleTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '').slice(0, 11);
    if (/^\d*$/.test(rawValue)) {
      const num = Number(rawValue).toLocaleString();
      setTarget(num);
    }
  };

  const handleLogContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setLogContentCount(0);
      setLogContent('');
    }
    const lengthCount = limitMaxLength(e, 100);

    if (!lengthCount) return;
    setLogContentCount(lengthCount);
    setLogContent(e.target.value);
  };

  useEffect(() => {
    target && logContent ? setIsActiveBtn(true) : setIsActiveBtn(false);
  }, [target, logContent]);
  return (
    <section css={enterLayoutStyles}>
      <article css={enterArticleStyles}>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgress">kr 수정</StLabel>
          <StEditNum>
            <span>통합 가입 수</span>
            <StEditNumInput
              id="enterProgress"
              placeholder="200,000"
              value={target}
              onChange={handleTargetChange}
            />
            <span>건 돌파</span>
          </StEditNum>
        </span>
        <CheckInInput
          logContent={logContent}
          handleLogContentChange={handleLogContentChange}
          logContentCount={logContentCount}
        />
      </article>
      <footer css={enterFooterStyles}>
        <StCnclBtn>취소</StCnclBtn>
        <StEnterBtn1 isActiveBtn={isActiveBtn}>체크인 완료</StEnterBtn1>
      </footer>
    </section>
  );
};

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

const StCnclBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14.5rem;
  height: 3rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;
  ${({ theme }) => theme.fonts.btn_14_semibold};
`;

const StEnterBtn1 = styled(StCnclBtn)<{ isActiveBtn: boolean }>`
  color: ${({ theme, isActiveBtn }) =>
    isActiveBtn ? theme.colors.gray_600 : theme.colors.gray_000};
  background-color: ${({ theme, isActiveBtn }) =>
    isActiveBtn ? theme.colors.sub_mint : theme.colors.gray_500};
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

const StCharacterCountContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
