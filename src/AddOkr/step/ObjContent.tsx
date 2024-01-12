import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { limitMaxLength } from '@utils/limitMaxLength';
import { useState } from 'react';

const ObjContent = () => {
  const MAX_OBJ_TEXTAREA_CNT = 100;
  const [currContentCnt, setCurrContentCnt] = useState(0);

  const handleContentTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') setCurrContentCnt(0);

    const contentTextareaCnt = limitMaxLength(e, MAX_OBJ_TEXTAREA_CNT);

    if (!contentTextareaCnt) return;
    setCurrContentCnt(contentTextareaCnt);
  };

  return (
    <section css={ObjContentContainer}>
      <StObjContentTitle>목표를 달성하고 싶은 이유와 그 다짐을 기록해주세요.</StObjContentTitle>
      <div css={ContentTextAreaWrapper}>
        <StObjContentTextArea
          placeholder={
            'ex) 앞으로 한 달간 다양한 마케팅을 통해 더 많은 고객을 유치하고 매출을 늘리고 싶기 때문이다.'
          }
          onChange={handleContentTextarea}
        />
        <StContentTextAreaCntTxt>
          {currContentCnt}/{MAX_OBJ_TEXTAREA_CNT}
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
  margin-bottom: 5.3rem;
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
  margin-bottom: 9.8rem;
`;

const StObjContentTextArea = styled.textarea`
  width: 42rem;
  height: 19.2rem;
  padding: 1.2rem 1.6rem;
  color: ${({ theme }) => theme.colors.gray_350};
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
