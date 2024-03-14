import { KR_INPUT_DATA } from '@constants/addKr/KR_INPUT_DATA';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';

import KeyResultPeriodInput from '../../../AddOkr/components/addKr/KeyResultPeriodInput';
import {
  MAX_KR_METRIC,
  MAX_KR_TARGET,
  MAX_KR_TITLE,
} from '../../../AddOkr/constants/OKR_MAX_LENGTH';
import { IKrListInfoTypes } from '../../../AddOkr/types/KrInfoTypes';
import { IObjInfoTypes } from '../../../AddOkr/types/ObjectInfoTypes';

const { INPUT_TITLE, INPUT_TARGET, INPUT_METRIC } = KR_INPUT_DATA.INPUT_NAME;
const { HINT_TITLE, HINT_TARGET, HINT_METRIC } = KR_INPUT_DATA.HINT_PLACHOLDER;

interface IAddKrFormProps {
  style: {
    gap: string;
    inputStyle: { longWidth: string; shortWidth: string; height: string; shortGap: string };
  };
  krInfo: IKrListInfoTypes;
  objInfo: IObjInfoTypes;
  inputHandler: {
    isValidMax: { krTitle: boolean; krTarget: boolean; krMetric: boolean };
    handleChangeKrValues: (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => void;
  };
  calenderHandler: {
    isShowCalender: boolean;
    handleClickKrPeriodBox: () => void;
    handleClickSelectDate: (
      _values: [Dayjs | null, Dayjs | null] | null,
      formatString: [string, string],
    ) => void;
  };
}

const AddKrForm = ({ style, krInfo, objInfo, inputHandler, calenderHandler }: IAddKrFormProps) => {
  const { krTitle, krTarget, krMetric, krStartAt, krExpireAt } = krInfo;

  const { gap, inputStyle } = style;
  const { isValidMax, handleChangeKrValues } = inputHandler;
  const { isShowCalender, handleClickKrPeriodBox, handleClickSelectDate } = calenderHandler;

  return (
    <StAddKrFormWrapper $gap={gap}>
      {/* 핵심 지표 문장 입력 부분 */}
      <div css={AddKrInputContainer}>
        <StAddKrInputDescription>핵심 지표를 문장으로 정리해볼까요?</StAddKrInputDescription>
        <StKrTitleInput
          type="text"
          name={INPUT_TITLE}
          placeholder={HINT_TITLE}
          value={krTitle}
          onChange={(e) => handleChangeKrValues(e, MAX_KR_TITLE)}
          $isMax={isValidMax.krTitle}
          $inputStyle={inputStyle}
          autoComplete="off"
        />
      </div>

      {/*수치값 단위 입력 부분*/}
      <div css={AddKrInputContainer}>
        <StAddKrInputDescription>
          핵심 지표를 측정할 수치값과 단위를 입력해주세요
        </StAddKrInputDescription>
        <StTargetMetricInputContainer $ContainerGap={inputStyle.shortGap}>
          <StTaretMetricInput
            type="text"
            name={INPUT_TARGET}
            placeholder={HINT_TARGET}
            value={krTarget}
            onChange={(e) => handleChangeKrValues(e, MAX_KR_TARGET)}
            $isMax={isValidMax.krTarget}
            $inputStyle={inputStyle}
            autoComplete="off"
          />
          <StTaretMetricInput
            type="text"
            name={INPUT_METRIC}
            placeholder={HINT_METRIC}
            value={krMetric}
            onChange={(e) => handleChangeKrValues(e, MAX_KR_METRIC)}
            $isMax={isValidMax.krMetric}
            $inputStyle={inputStyle}
            autoComplete="off"
          />
        </StTargetMetricInputContainer>
      </div>
      <div css={AddKrInputContainer}>
        <StAddKrInputDescription>핵심 지표를 달성할 기간을 입력해주세요</StAddKrInputDescription>
        <StKrPeriodBox onClick={handleClickKrPeriodBox} $boxStyle={inputStyle}>
          {isShowCalender ? (
            <KeyResultPeriodInput
              handleClickSelectDate={handleClickSelectDate}
              krPeriod={[krStartAt, krExpireAt]}
              objInfo={objInfo}
            />
          ) : (
            <p>YYYY.MM.DD - YYYY.MM.DD</p>
          )}
        </StKrPeriodBox>
      </div>
    </StAddKrFormWrapper>
  );
};

export default AddKrForm;

const StAddKrFormWrapper = styled.div<{ $gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};
  align-items: center;
  width: fit-content;
  height: fit-content;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: inherit;
`;

const AddKrInputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StAddKrInputDescription = styled.p`
  ${({ theme }) => theme.fonts.body_14_semibold};
`;

const StAddKCommonInputStyle = styled.input<{
  $isMax: boolean;
  $inputStyle: { longWidth: string; shortWidth: string; height: string; shortGap: string };
}>`
  height: ${({ $inputStyle }) => $inputStyle.height};
  padding: 0.8rem 1rem;
  color: ${({ theme, $isMax }) => ($isMax ? theme.colors.sub_lightred : theme.colors.gray_000)};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_350};
  }
`;

const StKrTitleInput = styled(StAddKCommonInputStyle)`
  width: ${({ $inputStyle }) => $inputStyle.longWidth};
`;

const StTargetMetricInputContainer = styled.div<{ $ContainerGap: string }>`
  display: flex;
  gap: 1rem;
`;

const StTaretMetricInput = styled(StAddKCommonInputStyle)`
  width: ${({ $inputStyle }) => $inputStyle.shortWidth};
`;

const StKrPeriodBox = styled.div<{
  $boxStyle: { longWidth: string; shortWidth: string; height: string; shortGap: string };
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $boxStyle }) => $boxStyle.longWidth};
  height: ${({ $boxStyle }) => $boxStyle.height};
  padding: 0.6rem 0;
  color: ${({ theme }) => theme.colors.gray_400};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }
`;
