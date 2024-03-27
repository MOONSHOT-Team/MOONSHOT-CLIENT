import { KR_NUM_ERR_MSG, KR_TEXT_ERR_MSG } from '@constants/addKr/KR_ERR_MSG';
import { KR_INPUT_DATA } from '@constants/addKr/KR_INPUT_DATA';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AddKrInputMsgWrapper, StAddKrErrMsg } from '@styles/addKr/CommonErrMsgBoxStyle';
import { useState } from 'react';

import { MAX_KR_METRIC, MAX_KR_TARGET } from '../../constants/OKR_MAX_LENGTH';
import { EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';
import { IKrListInfoTypes } from '../../types/KrInfoTypes';

interface IGuideSecondKeyResultCardProps {
  krListInfo: IKrListInfoTypes[];
  setKrListInfo: React.Dispatch<React.SetStateAction<IKrListInfoTypes[]>>;
  cardIdx: number;
}

const { HINT_TARGET, HINT_METRIC } = KR_INPUT_DATA.HINT_PLACHOLDER;
const { INPUT_TARGET, INPUT_METRIC } = KR_INPUT_DATA.INPUT_NAME;

const GuideSecondKeyResultCard = ({
  krListInfo,
  setKrListInfo,
  cardIdx,
}: IGuideSecondKeyResultCardProps) => {
  const { krTitle, krTarget, krMetric } = krListInfo[cardIdx];
  const [isValidMax, setIsValidMax] = useState<{ [key: string]: boolean }>({
    [INPUT_TARGET]: false,
    [INPUT_METRIC]: false,
  });

  const handleGuidTargetMetricInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxLength: number,
  ) => {
    const targetInputName = e.target.name;
    let parsedValue = e.target.value.replace(/[^-0-9]/g, '');
    let newValue;

    switch (targetInputName) {
      // TODO : maxLength를 자리수로 고려 했을 떄 처리 방법. 일단 의논이 필요 해 주석처리
      // case KR_INPUT_DATA.INPUT_NAME.INPUT_TARGET:
      //   if (parsedValue.length === maxLength + 1) {
      //     setIsValidMax({ ...isValidMax, [targetInputName]: true });
      //   }

      //   if (isValidMax[targetInputName]) {
      //     parsedValue = parsedValue.slice(0, maxLength);
      //     setIsValidMax({ ...isValidMax, [targetInputName]: false });
      //   }

      //   newValue = parsedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      //   break;

      case INPUT_TARGET:
        if (Number(parsedValue) > maxLength) {
          setIsValidMax({ ...isValidMax, [targetInputName]: true });
        }

        if (isValidMax[targetInputName]) {
          parsedValue = maxLength.toString();
          setIsValidMax({ ...isValidMax, [targetInputName]: false });
        }

        newValue = parsedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        break;

      default:
        if (e.target.value.length > maxLength) {
          setIsValidMax({ ...isValidMax, [targetInputName]: true });
        }

        if (isValidMax[targetInputName] === true) {
          e.target.value = e.target.value.slice(0, maxLength);
          setIsValidMax({ ...isValidMax, [targetInputName]: false });
        }

        newValue = e.target.value;

        break;
    }

    krListInfo[cardIdx] = { ...krListInfo[cardIdx], [targetInputName]: newValue };
    setKrListInfo([...krListInfo]);
  };

  return (
    <StGuideSecondKeyResultCardWrapper>
      <StSecondKrTitleBox>
        <p>목표를 달성하기 위해 필요한 성과는 다음과 같아요.</p>
        <StTargetKrTitle>{krTitle}</StTargetKrTitle>
      </StSecondKrTitleBox>

      <StSecondKrTargetMetricBox>
        <p>이 성과를 측정할 수 있는 수치값과 단위를 입력하세요.</p>
        <div css={TargetMetricInputBox}>
          <div css={AddKrInputMsgWrapper}>
            <StTargetMetricInput
              value={krTarget}
              name={INPUT_TARGET}
              onChange={(e) => handleGuidTargetMetricInput(e, MAX_KR_TARGET)}
              placeholder={HINT_TARGET}
              $isMax={isValidMax[INPUT_TARGET]}
              autoComplete="off"
            />
            {isValidMax.krTarget && <StAddKrErrMsg>{KR_NUM_ERR_MSG}</StAddKrErrMsg>}
          </div>

          <div css={AddKrInputMsgWrapper}>
            <StTargetMetricInput
              name={INPUT_METRIC}
              value={krMetric}
              onChange={(e) => handleGuidTargetMetricInput(e, MAX_KR_METRIC)}
              placeholder={HINT_METRIC}
              $isMax={isValidMax[INPUT_METRIC]}
              autoComplete="off"
            />
            {isValidMax.krMetric && <StAddKrErrMsg>{KR_TEXT_ERR_MSG}</StAddKrErrMsg>}
          </div>
        </div>
      </StSecondKrTargetMetricBox>
    </StGuideSecondKeyResultCardWrapper>
  );
};

export default GuideSecondKeyResultCard;

const StGuideSecondKeyResultCardWrapper = styled(EmptyKeyResultCard)`
  gap: 4.4rem;
  justify-content: center;
  padding: 0 1.7rem;
`;

const StSecondKrTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StTargetKrTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.2rem;
  padding: 0.6rem 0;
  color: ${({ theme }) => theme.colors.gray_350};
`;

const StSecondKrTargetMetricBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${({ theme }) => theme.fonts.body_14_medium};
`;

const TargetMetricInputBox = css`
  display: flex;
  gap: 0.7rem;
`;

const StTargetMetricInput = styled.input<{ $isMax: boolean }>`
  display: flex;
  align-items: center;
  width: 14.6rem;
  height: 3.2rem;
  padding: 1rem;
  color: ${({ theme, $isMax }) => ($isMax ? '#ff6969' : theme.colors.gray_000)};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_350};
  }

  ${({ theme }) => theme.fonts.body_14_medium};
`;
