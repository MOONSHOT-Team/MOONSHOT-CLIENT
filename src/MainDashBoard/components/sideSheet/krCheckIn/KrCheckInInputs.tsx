import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { limitMaxLength } from '@utils/limitMaxLength';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSWRConfig } from 'swr';

import { patchCheckIn, postCheckIn } from '../../../apis/fetcher';
import { StErrorMSG } from '../../../styles/mainDashBoardStyles';

const CHECK_IN_PLACEHOLDER =
  '회고 내용을 입력하세요\n\n • 목표와 주요 결과에서 얼마나 진전을 이루었나요?\n • 이러한 목표를 선택한 것이 옳은 선택이었나요?\n • 실행 과정에 얼마나 만족하는지 알려주세요';

const MAX_NUM_COUNT = 6;
const MAX_NUM_OVER_COUNT = 7;
const MAX_TEXT_COUNT = 100;
const DUP_KRNUM_SERVERMSG = 'Log 입력값은 이전 값과 동일할 수 없습니다.';
const MAX_NUM_ERRMSG = '입력 최대 범위는 999,999 입니다';
const DUP_NUM_ERRMSG = '기존 KR과 동일한 수치입니다';

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
        id="enterProgressCheckIn"
        placeholder={CHECK_IN_PLACEHOLDER}
        value={logContent}
        onChange={handleLogContentChange}
        autoComplete="off"
      />
      {logContent && <CharacterCount currentCnt={logContentCount} maxCnt={MAX_TEXT_COUNT} />}
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
  objId: number;
}

/** 진척 정도 입력하는 뷰입니다 */
export const 진척정도입력하기 = ({
  onCancel,
  keyResultId,
  handleChangeState,
  objId,
}: IKrCheckInProps) => {
  const [logNum, setLogNum] = useState('');
  const [logContent, setLogContent] = useState('');
  const [logContentCount, setLogContentCount] = useState(0);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isMaxNum, setIsMaxNum] = useState(false);

  const { mutate } = useSWRConfig();

  const navigate = useNavigate();

  useEffect(() => {
    logNum && logContent ? setIsActiveBtn(true) : setIsActiveBtn(false);
  }, [logNum, logContent]);

  const handleLogNumChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setLogNum('');
      return;
    }

    if (e.target.value.length > MAX_NUM_OVER_COUNT) {
      setIsMaxNum(true);
    }

    if (e.target.value.length <= MAX_NUM_COUNT) {
      setIsMaxNum(false);
    }

    const rawValue = e.target.value.replace(/,/g, '').slice(0, MAX_NUM_COUNT);

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

    const lengthCount = limitMaxLength(e, MAX_TEXT_COUNT);

    if (!lengthCount) return;

    setLogContentCount(lengthCount);
    setLogContent(e.target.value);
  };

  //서버 통신 함수
  const submitCheckIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    const data = {
      keyResultId: keyResultId,
      logNum: parseInt(logNum.replace(/,/g, '')),
      logContent: logContent,
    };

    try {
      const response = await postCheckIn('/v1/log', data);
      await mutate(`/v1/key-result/${keyResultId}`);
      await mutate(`/v1/objective?objectiveId=${objId}`);
      if (response.status === 200) {
        //축하모션
        handleChangeState?.(2);
      }
    } catch {
      navigate('/error');
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
            {isMaxNum && <StErrorMSG>{MAX_NUM_ERRMSG}</StErrorMSG>}
          </div>
        </span>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgressCheckIn">체크인</StLabel>
          <CheckInInput
            logContent={logContent}
            handleLogContentChange={handleLogContentChange}
            logContentCount={logContentCount}
          />
        </span>
      </article>
      <footer css={enterFooterStyles}>
        <StCnclBtn onClick={onCancel}>취소</StCnclBtn>
        <StEnterBtn1
          isActiveBtn={isActiveBtn}
          disabled={!isActiveBtn}
          onClick={submitCheckIn}
          className="check_record"
        >
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
  handleChangeState,
  objId,
}: IKrCheckInProps) => {
  const [targetValue, setTarget] = useState('');
  const [logContent, setLogContent] = useState('');
  const [logContentCount, setLogContentCount] = useState(0);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isMaxNum, setIsMaxNum] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const navigator = useNavigate();

  const { mutate } = useSWRConfig();

  const handleTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSame(false);
    if (e.target.value === '') {
      setTarget('');
      return;
    }
    if (e.target.value.length > MAX_NUM_COUNT + 1) {
      setIsMaxNum(true);
    }
    if (e.target.value.length <= MAX_NUM_COUNT + 1) {
      setIsMaxNum(false);
    }
    const rawValue = e.target.value.replace(/,/g, '').slice(0, MAX_NUM_COUNT);
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
      krTarget: parseInt(targetValue.replace(/,/g, '')),
      logContent,
    };

    try {
      const response = await patchCheckIn('/v1/key-result', data);
      await mutate(`/v1/key-result/${keyResultId}`);
      await mutate(`/v1/objective?objectiveId=${objId}`);
      if (response?.data) {
        handleChangeState?.(2);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.message === DUP_KRNUM_SERVERMSG) setIsSame(true);
        return;
      }
      navigator('/error');
    }
    onCancel();
  };

  return (
    <section css={enterLayoutStyles}>
      <article css={enterArticleStyles}>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgress">KR 수정</StLabel>
          <StEditNum>
            <span css={{ maxWidth: '11rem' }}>{title}</span>
            <span css={{ position: 'relative' }}>
              <StEditNumInput
                id="enterProgress"
                placeholder={target.toLocaleString()}
                value={targetValue}
                onChange={handleTargetChange}
                autoComplete="off"
                isMaxNum={isSame || isMaxNum}
              />
              {isSame && <StErrorMSG>{DUP_NUM_ERRMSG}</StErrorMSG>}
              {isMaxNum && <StErrorMSG>{MAX_NUM_ERRMSG}</StErrorMSG>}
            </span>
            <span>{metric}</span>
          </StEditNum>
        </span>
        <span css={enterInputBoxStyles}>
          <StLabel htmlFor="enterProgressCheckIn">체크인</StLabel>
          <CheckInInput
            logContent={logContent}
            handleLogContentChange={handleLogContentChange}
            logContentCount={logContentCount}
          />
        </span>
      </article>
      <footer css={enterFooterStyles}>
        <StCnclBtn onClick={onCancel}>취소</StCnclBtn>
        <StEnterBtn1
          isActiveBtn={isActiveBtn}
          disabled={!isActiveBtn}
          onClick={submitCheckIn}
          className="check_adjust"
        >
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

  /* gap: 0.8rem; */
  align-items: center;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const StEditNumInput = styled.input<{ isMaxNum: boolean }>`
  width: 12rem;
  padding: 1.1rem 1.2rem;
  margin: 0 0.8rem;
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
