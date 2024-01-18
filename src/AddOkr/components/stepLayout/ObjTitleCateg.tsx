import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { limitMaxLength } from '@utils/limitMaxLength';
import { useState } from 'react';

import { GUIDE_OBJ_TITLE_PLACEHOLDER } from '../../constants/GUIDE_OBJ_TITLE_PLACEHOLDER';
import { OBJ_CATEG_LIST } from '../../constants/OBJ_CATEG_LIST';
import { IAddObjFlowProps } from '../../types/ObjectInfoTypes';
import ObjCategTag from '../objTitleCateg/ObjCategTag';

interface IObjTitleCategProps extends IAddObjFlowProps {
  isGuide: boolean;
}
//object tilte input/textare 최대 글자수
const MAX_OBJ_INPUT_CNT = 30;

// 가이드에 따라 설정하기 기본 placeholder
const GUIDE_DEFAULT_PLACEHOLDER = '목표를 입력하세요.';

const ObjTitleCateg = ({ isGuide, objInfo, setObjInfo }: IObjTitleCategProps) => {
  const { objCategory: selectedObjCateg, objTitle } = objInfo;
  //글자 수 관리 값
  const [currObjCount, setCurrObjCount] = useState(objTitle ? objTitle.length : 0);
  // 2) 가이드 플로우 - hover한 objtag를 담는 상태
  const [hoverObjPlaceHolder, setHoverObjPlaceHolder] = useState(GUIDE_DEFAULT_PLACEHOLDER);

  /** 
  직접 작성 & 가이드에 따라 작성 공통 사용
  **/
  // 카테고리 태그 선택 핸들러
  const handleClickObjCateg = (e: React.MouseEvent<HTMLButtonElement>) => {
    setObjInfo({ ...objInfo, objCategory: e.currentTarget.id });
  };

  //obj input change 핸들러
  const handleChangeObjValue = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.value === '') setCurrObjCount(0);

    const objInputCnt = limitMaxLength(e, MAX_OBJ_INPUT_CNT);

    if (objInputCnt) setCurrObjCount(objInputCnt);
    setObjInfo({ ...objInfo, objTitle: e.target.value });
  };

  /**
  가이드에 따라 설정하기 뷰 사용
  **/
  // hover한 objtag를 가져오는 핸들러
  const handleHoverObjCateg = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { placeholder: targetPlaceholder } = GUIDE_OBJ_TITLE_PLACEHOLDER.filter(
      (tag) => tag.id === e.currentTarget.id,
    )[0];
    setHoverObjPlaceHolder(targetPlaceholder);
  };

  // 이미 선택된 obj가 있을때, mouseleave시 선택 된 obj의 placeholder로 유지되도록
  const handleMouseLeaveObjCateg = () => {
    if (!selectedObjCateg) return;
    const { placeholder: targetPlaceholder } = GUIDE_OBJ_TITLE_PLACEHOLDER.filter(
      (tag) => tag.id === selectedObjCateg,
    )[0];

    setHoverObjPlaceHolder(targetPlaceholder);
  };

  return (
    <section css={ObjTitleCategContainer}>
      <StObjTitleCategTitle>
        {'어떤 목표를 달성하고 싶나요?\n가슴 뛰는 목표를 구체적으로 적어주세요.'}
      </StObjTitleCategTitle>

      {/* 카테고리 선택 영역*/}
      <div css={ObjCategWrapper}>
        {OBJ_CATEG_LIST.map(({ id }) => {
          return (
            <ObjCategTag
              key={id}
              id={id}
              isClicked={selectedObjCateg === id}
              handleClickObjTag={handleClickObjCateg}
              handleHoverObjCateg={handleHoverObjCateg}
              handleMouseLeaveObjCateg={handleMouseLeaveObjCateg}
            />
          );
        })}
      </div>

      {/* input 영역 -> 직접 설정 or 가이드에 따라 설정에 따라 달라지는 부분 */}
      {isGuide ? (
        <div css={ObjTextAreaBox}>
          {/* 1) 가이드에 따라 설정 플로우 */}
          <StObjTextArea
            value={objTitle}
            placeholder={hoverObjPlaceHolder}
            onChange={handleChangeObjValue}
            autoComplete="off"
          />
          <StObjTextAreaCntTxt>
            {currObjCount}/{MAX_OBJ_INPUT_CNT}
          </StObjTextAreaCntTxt>
        </div>
      ) : (
        <div css={ObjInputBox}>
          {/* 2) 직접 설정 플로우 */}
          <StObjInput
            type="text"
            value={objTitle}
            placeholder="목표를 입력하세요"
            onChange={handleChangeObjValue}
            autoComplete="off"
          />
          <StObjInputCntTxt>
            {currObjCount} / {MAX_OBJ_INPUT_CNT}
          </StObjInputCntTxt>
        </div>
      )}
    </section>
  );
};

export default ObjTitleCateg;

const ObjTitleCategContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StObjTitleCategTitle = styled.h1`
  width: 31.9rem;
  margin-top: 1rem;
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

// 직접 설정하기 - 목표 입력 input 스타일
const ObjInputBox = css`
  position: relative;
  width: fit-content;
  height: fit-content;
  margin-bottom: 6rem;
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

const StObjInputCntTxt = styled.p`
  position: absolute;
  top: 2.4rem;
  right: 2rem;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

//가이드에 따라 설정 - 목표 입력 textare 스타일
const ObjTextAreaBox = css`
  position: relative;
  width: fit-content;
  height: fit-content;
  margin-bottom: 3.2rem;
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
    color: ${({ theme }) => theme.colors.gray_350};
    white-space: pre-line;
  }
`;

const StObjTextAreaCntTxt = styled.p`
  position: absolute;
  right: 1.6rem;
  bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
