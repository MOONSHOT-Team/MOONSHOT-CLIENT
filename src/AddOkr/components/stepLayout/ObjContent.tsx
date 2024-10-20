import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { limitMaxLength } from '@utils/limitMaxLength';
import { useEffect, useState } from 'react';

import { MAX_OBJ_CONTENT } from '../../constants/OKR_MAX_LENGTH';
import { IAddObjFlowProps } from '../../types/ObjectInfoTypes';

// 기본 placeholder
const OBJ_CONTENT_PLACEHOLDER =
  'ex) 퇴근 후 누워있기만 하지 말고, 내가 원하는 일을 하며 시간을 알차게 쓰고 싶다.';

const ObjContent = ({ objInfo, setObjInfo, onValidNextStep }: IAddObjFlowProps) => {
  const { objContent } = objInfo;
  // 글자 수 저장 값
  const [currContentCnt, setCurrContentCnt] = useState(objContent ? objContent.length : 0);

  const handleContentTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') setCurrContentCnt(0);

    const contentTextareaCnt = limitMaxLength(e, MAX_OBJ_CONTENT);

    if (contentTextareaCnt) setCurrContentCnt(contentTextareaCnt);
    setObjInfo({ ...objInfo, objContent: e.target.value });
  };

  useEffect(() => {
    onValidNextStep(!!objContent);
  }, [objContent]);

  return (
    <section css={ObjContentContainer}>
      <StObjContentTitle>목표를 달성하고 싶은 이유와 다짐을 기록해주세요</StObjContentTitle>
      <div css={ContentTextAreaWrapper}>
        <StObjContentTextArea
          value={objContent}
          placeholder={OBJ_CONTENT_PLACEHOLDER}
          onChange={handleContentTextarea}
          maxLength={100}
          rows={5}
          autoComplete="off"
        />
        <StContentTextAreaCntTxt>
          {currContentCnt}/{MAX_OBJ_CONTENT}
        </StContentTextAreaCntTxt>
      </div>
    </section>
  );
};

export default ObjContent;

const ObjContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const StObjContentTitle = styled.h1`
  margin: 1rem 0 5.3rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_20_semibold};
`;

const ContentTextAreaWrapper = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin-bottom: 7.5rem;
`;

const StObjContentTextArea = styled.textarea`
  width: 42rem;
  height: 19.2rem;
  padding: 1.2rem 1.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  word-break: keep-all;
  overflow-wrap: break-word;
  resize: none;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StContentTextAreaCntTxt = styled.p`
  position: absolute;
  right: 1.6rem;
  bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
