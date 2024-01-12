import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { limitMaxLength } from '@utils/limitMaxLength';
import { useState } from 'react';

import { GUIDE_OBJ_TITLE_PLACEHOLDER } from '../../constants/GUIDE_OBJ_TITLE_PLACEHOLDER';
import { OBJ_CATEG_LIST } from '../../constants/OBJ_CATEG_LIST';
import ObjCategTag from '../objTitleCateg/ObjCategTag';

interface IObjTitleCategProps {
  selectedMethod: string;
}

const ObjTitleCateg = ({ selectedMethod }: IObjTitleCategProps) => {
  // 카테고리 태그 상태
  const [selectedObjCatg, setSelectedObjCateg] = useState('');
  // 직접 입력 뷰 - input 글자 수 상태
  const [currObjCount, setCurrObjCount] = useState(0);
  const MAX_OBJ_INPUT_CNT = 30;

  //카테고리 선택 뷰 - place holder 색상
  const DEFAULT_PLACEHOLDER = '목표를 입력하세요.';
  const [hoverObjPlaceHolder, setHoverObjPlaceHolder] = useState(DEFAULT_PLACEHOLDER);

  // 카테고리 태그 선택 핸들러
  const handleClickObjCateg = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedObjCateg(e.currentTarget.id);
  };

  const handleHoverObjCateg = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { placeholder: targetPlaceholder } = GUIDE_OBJ_TITLE_PLACEHOLDER.filter(
      (tag) => tag.id === e.currentTarget.id,
    )[0];
    setHoverObjPlaceHolder(targetPlaceholder);
  };

  const handleLeaveObjCateg = () => {
    // setHoverObjPlaceHolder(DEFAULT_PLACEHOLDER);
  };

  //obj input change 핸들러
  const handleChangeObjValue = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.value === '') setCurrObjCount(0);

    const objInputCnt = limitMaxLength(e, MAX_OBJ_INPUT_CNT);

    if (!objInputCnt) return;
    setCurrObjCount(objInputCnt);
  };

  return (
    <section css={ObjTitleCategContainer}>
      <StObjTitleCategTitle>
        {'어떤 목표를 달성하고 싶나요?\n가슴 뛰는 목표를 구체적으로 적어주세요.'}
      </StObjTitleCategTitle>

      <div css={ObjCategWrapper}>
        {OBJ_CATEG_LIST.map(({ id, text }) => {
          return (
            <ObjCategTag
              key={id}
              id={id}
              text={text}
              isClicked={selectedObjCatg === id}
              handleClickObjTag={handleClickObjCateg}
              handleHoverObjCateg={handleHoverObjCateg}
              handleLeaveObjCateg={handleLeaveObjCateg}
            />
          );
        })}
      </div>

      {selectedMethod === '직접 설정하기' && (
        <div css={ObjInputBox}>
          <StObjInput type="text" placeholder="목표를 입력하세요" onChange={handleChangeObjValue} />
          <StObjInputCntTxt>
            {currObjCount} / {MAX_OBJ_INPUT_CNT}
          </StObjInputCntTxt>
        </div>
      )}

      <div css={ObjTextAreaBox}>
        <StObjTextArea placeholder={hoverObjPlaceHolder} onChange={handleChangeObjValue} />
        <StObjTextAreaCntTxt>
          {currObjCount}/{MAX_OBJ_INPUT_CNT}
        </StObjTextAreaCntTxt>
      </div>
    </section>
  );
};

export default ObjTitleCateg;

const ObjTitleCategContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-bottom: 6rem;
`;

const StObjTitleCategTitle = styled.h1`
  width: 31.9rem;
  color: ${({ theme }) => theme.colors.gray_000};
  text-align: center;
  white-space: pre-line;

  ${({ theme }) => theme.fonts.title_20_semibold};
`;

const ObjCategWrapper = css`
  display: flex;
  gap: 1rem;
  margin: 3.4rem 0 1.9rem;
`;

const StObjInput = styled.input`
  width: 60rem;
  height: 6.6rem;
  padding: 2.3rem 2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_14_medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_350};
  }
`;

const ObjInputBox = css`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const StObjInputCntTxt = styled.p`
  position: absolute;
  top: 2.4rem;
  right: 2rem;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

//가이드에 따라 설정 스타일
const ObjTextAreaBox = css`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const StObjTextArea = styled.textarea`
  width: 42rem;
  height: 16.8rem;
  padding: 1.2rem 1.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  resize: none;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_14_medium};

  &::placeholder {
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray_350};
  }
`;

const StObjTextAreaCntTxt = styled.p`
  position: absolute;
  right: 1.6rem;
  bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
