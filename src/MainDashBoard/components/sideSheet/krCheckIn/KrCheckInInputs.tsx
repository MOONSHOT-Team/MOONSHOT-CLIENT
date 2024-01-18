import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { limitMaxLength } from '@utils/limitMaxLength';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

import { patchCheckIn, postCheckIn } from '../../../apis/fetcher';

const CHECKINPLACEHOLDER =
  '회고 내용을 입력하세요\n\n  • 목표와 주요 결과에서 얼마나 진전을 이루었나요?\n  • 핵심 지표가 목표를 달성하는데 도움 되었나요?\n  • 달성하는 동안 어떤 어려움이 있었는지 기록 해보세요';

const MAX_NUMCNT = 6;
const MAX_TEXTCNT = 100;

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
  handleLogContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  logContentCount: number;
}
/** 체크인 회고 textarea 컴포넌트입니다*/
const CheckInInput = ({
  logContent,
  handleLogContentChange,
  logContentCount,
}: ICheckInInputProps) => {
  return (
    <div css={inputBoxStyles}>
      <StCheckInTextArea
        id="enterProgressCheckin"
        placeholder={CHECKINPLACEHOLDER}
        value={logContent}
        onChange={handleLogContentChange}
        autoComplete="off"
      />
      {logContent && <CharacterCount currentCnt={logContentCount} maxCnt={MAX_TEXTCNT} />}
    </div>
  );
};

interface IKrCheckInProps {
  onCancel: () => void;
  keyResultId: number;
  title?: string;
  target?: number;
  metric?: string;
  handleChangeState?: (state: number) => void;
}

/** 진척 정도 입력하는 뷰입니다 */
export const 진척정도입력하기 = ({ onCancel, keyResultId, handleChangeState }: IKrCheckInProps) => {
  const [logNum, setLogNum] = useState('');
  const [logContent, setLogContent] = useState('');
  const [logContentCount, setLogContentCount] = useState(0);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isMaxNum, setIsMaxnum] = useState(false);

  useEffect(() => {
    logNum && logContent ? setIsActiveBtn(true) : setIsActiveBtn(false);
  }, [logNum, logContent]);

  const handleLogNumChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setLogNum('');
      return;
    }
    if (e.target.value.length > MAX_NUMCNT + 1) {
      setIsMaxnum(true);
    }
    if (e.target.value.length <= MAX_NUMCNT) {
      setIsMaxnum(false);
    }
    const rawValue = e.target.value.replace(/,/g, '').slice(0, MAX_NUMCNT);
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
    const lengthCount = limitMaxLength(e, MAX_TEXTCNT);

    if (!lengthCount) return;
    setLogContentCount(lengthCount);
    setLogContent(e.target.value);
  };

  //서버 통신 함수
  const submitCheckIn = async () => {
    const data = {
      keyResultId: keyResultId,
      logNum: parseInt(logNum.replace(/,/g, '')),
      logContent: logContent,
    };

    const response = await postCheckIn('/v1/log', data);
    await mutate(`/v1/key-result/${keyResultId}`);

    if (response.status === 201) {
      //축하모션
      console.log(response);
      handleChangeState?.(2);
    }
    onCancel();
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
              placeholder="진척 정도를 확인할 수 있는 수치를 입력하세요"
              value={logNum.toLocaleString()}
              onChange={handleLogNumChange}
              autoComplete="off"
              isMaxNum={isMaxNum}
            />
          </div>
        </span>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgressCheckin">체크인</StLabel>
          <CheckInInput
            logContent={logContent}
            handleLogContentChange={handleLogContentChange}
            logContentCount={logContentCount}
          />
        </span>
      </article>
      <footer css={enterFooterStyles}>
        <StCnclBtn onClick={onCancel}>취소</StCnclBtn>
        <StEnterBtn1 isActiveBtn={isActiveBtn} disabled={!isActiveBtn} onClick={submitCheckIn}>
          체크인 완료
        </StEnterBtn1>
      </footer>
    </section>
  );
};

/** kr을 수정하는 뷰입니다 */
export const KR수정하기 = ({
  onCancel,
  keyResultId,
  title,
  target = 0,
  metric,
}: IKrCheckInProps) => {
  const [targetValue, setTarget] = useState('');
  const [logContent, setLogContent] = useState('');
  const [logContentCount, setLogContentCount] = useState(0);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isMaxNum, setIsMaxnum] = useState(false);
  const navigator = useNavigate();

  const handleTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setTarget('');
      return;
    }
    if (e.target.value.length > MAX_NUMCNT + 1) {
      setIsMaxnum(true);
    }
    if (e.target.value.length <= MAX_NUMCNT) {
      setIsMaxnum(false);
    }
    const rawValue = e.target.value.replace(/,/g, '').slice(0, MAX_NUMCNT);
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
    targetValue && logContent ? setIsActiveBtn(true) : setIsActiveBtn(false);
  }, [targetValue, logContent]);

  //서버 통신 함수
  const submitCheckIn = async () => {
    const data = {
      keyResultId,
      target: Number(targetValue),
      logContent,
    };

    try {
      await patchCheckIn('/v1/key-result', data);
      // SWR 캐시 업데이트
      await mutate(`/v1/key-result/${keyResultId}`);
      onCancel();
    } catch (err) {
      navigator('/error');
    }
  };

  return (
    <section css={enterLayoutStyles}>
      <article css={enterArticleStyles}>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgress">kr 수정</StLabel>
          <StEditNum>
            <span>{title}</span>
            <StEditNumInput
              id="enterProgress"
              placeholder={target.toLocaleString()}
              value={targetValue}
              onChange={handleTargetChange}
              autoComplete="off"
              isMaxNum={isMaxNum}
            />
            <span>{metric}</span>
          </StEditNum>
        </span>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgressCheckin">체크인</StLabel>
          <CheckInInput
            logContent={logContent}
            handleLogContentChange={handleLogContentChange}
            logContentCount={logContentCount}
          />
        </span>
      </article>
      <footer css={enterFooterStyles}>
        <StCnclBtn onClick={onCancel}>취소</StCnclBtn>
        <StEnterBtn1 isActiveBtn={isActiveBtn} disabled={!isActiveBtn} onClick={submitCheckIn}>
          체크인 완료
        </StEnterBtn1>
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

const StEnterProgressInput = styled.input<{ isMaxNum: boolean }>`
  width: 100%;
  padding: 1.1rem 1.2rem;
  color: ${({ theme, isMaxNum }) => (isMaxNum ? '#ff6969' : theme.colors.gray_000)};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_12_medium};

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
  all: revert;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27.4rem;
  height: 17.7rem;
  padding: 1.1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  word-break: keep-all;
  resize: none;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;
  ${({ theme }) => theme.fonts.body_12_medium};

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

const StEditNumInput = styled.input<{ isMaxNum: boolean }>`
  width: 12rem;
  padding: 1.1rem 1.2rem;
  color: ${({ theme, isMaxNum }) => (isMaxNum ? '#ff6969' : theme.colors.gray_000)};
  text-align: center;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_12_medium};

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
