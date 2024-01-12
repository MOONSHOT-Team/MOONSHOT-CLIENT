import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { limitMaxLength } from '@utils/limitMaxLength';
import { useState } from 'react';

import { OBJ_CATEG_LIST } from '../../constants/OBJ_CATEG_LIST';
import ObjCategTag from '../objTitleCateg/ObjCategTag';

interface IObjTitleCategProps {
  selectedMethod: string;
}

const ObjTitleCateg = ({ selectedMethod }: IObjTitleCategProps) => {
  // 카테고리 태그 상태
  const [selectedObjCatg, setSelectedObjCateg] = useState('');
  // 직접 입력 뷰 - input 글자 수 상태
  const [currObjInputCount, setCurrObjInputCount] = useState(0);
  const MAX_OBJ_INPUT_CNT = 30;

  // 카테고리 태그 선택 핸들러
  const handleClickObjCateg = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedObjCateg(e.currentTarget.id);
  };

  const handleChangeObjInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') setCurrObjInputCount(0);

    const objInputCnt = limitMaxLength(e, MAX_OBJ_INPUT_CNT);

    if (!objInputCnt) return;
    setCurrObjInputCount(objInputCnt);
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
            />
          );
        })}
      </div>

      {selectedMethod === '직접 설정하기' && (
        <div css={ObjInputBox}>
          <StObjInput type="text" placeholder="목표를 입력하세요" onChange={handleChangeObjInput} />
          <StObjInputCntTxt>
            {currObjInputCount} / {MAX_OBJ_INPUT_CNT}
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
