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
  let parsedValue = e.target.value.replace(/[^-0-9]/g, '');
  let newValue;

  switch (targetInputName) {
    case INPUT_TARGET:
      if (parsedValue.length === maxLength + 1) {
        setIsValidMax({ ...isValidMax, [targetInputName]: true });
      }

      if (isValidMax[targetInputName]) {
        parsedValue = parsedValue.slice(0, maxLength);
        setIsValidMax({ ...isValidMax, [targetInputName]: false });
      }

      newValue = parsedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      break;

    default:
      //INPUT_Title, INPUT_METRIC의 경우
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

  return { newValue: newValue, targetInputName: targetInputName };
};
