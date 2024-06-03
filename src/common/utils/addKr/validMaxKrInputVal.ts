import { KR_INPUT_DATA } from '@constants/addKr/KR_INPUT_DATA';
import React, { Dispatch, SetStateAction } from 'react';

const { INPUT_TARGET } = KR_INPUT_DATA.INPUT_NAME;

export const validMaxKrInputVal = (
  e: React.ChangeEvent<HTMLInputElement>,
  maxLength: number,
  isValidMax: {
    [key: string]: boolean;
  },
  setIsValidMax: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >,
) => {
  const targetInputName = e.target.name;
  let limitOnlyNumValue = e.target.value.replace(/[^-0-9]/g, '');
  let limitOnlyTextValue = e.target.value.replace(
    /[^-ᄀ-ᄒᆨ-ᇂㄱ-ㅣ가-힣ᅡ-ᅵa-zA-Z !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/gi,
    '',
  );
  let newValue;

  switch (targetInputName) {
    case INPUT_TARGET:
      if (limitOnlyNumValue.length === maxLength + 1) {
        setIsValidMax({ ...isValidMax, [targetInputName]: true });
      }

      if (isValidMax[targetInputName]) {
        limitOnlyNumValue = limitOnlyNumValue.slice(0, maxLength);
        setIsValidMax({ ...isValidMax, [targetInputName]: false });
      }

      newValue = limitOnlyNumValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      break;

    default:
      //case INPUT_TITLE, INPUT_METRIC
      if (limitOnlyTextValue.length > maxLength) {
        setIsValidMax({ ...isValidMax, [targetInputName]: true });
      }

      if (isValidMax[targetInputName] === true) {
        limitOnlyTextValue = limitOnlyTextValue.slice(0, maxLength);
        setIsValidMax({ ...isValidMax, [targetInputName]: false });
      }

      newValue = limitOnlyTextValue;

      break;
  }

  return { newValue: newValue, targetInputName: targetInputName };
};
