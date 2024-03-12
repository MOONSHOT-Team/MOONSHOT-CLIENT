import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { OKRTREEVIEWS } from '../../constants/OKRTREEVIEWS';

const EditBtn = ({
  state,
  setState,
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}) => {
  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return (
    <StContainer>
      <StRadioLabel htmlFor="view">
        <StRadio
          id="view"
          type="radio"
          name="isEdit"
          value={OKRTREEVIEWS[0]}
          defaultChecked
          onChange={handleRadio}
          checked={state == OKRTREEVIEWS[0]}
        />
        <StRadioSpanLeft>View</StRadioSpanLeft>
      </StRadioLabel>
      <StRadioLabel htmlFor="edit">
        <StRadio
          id="edit"
          type="radio"
          name="isEdit"
          value={OKRTREEVIEWS[1]}
          onChange={handleRadio}
          checked={state == OKRTREEVIEWS[1]}
        />
        <StRadioSpanRight>Edit</StRadioSpanRight>
      </StRadioLabel>
    </StContainer>
  );
};

export default EditBtn;

const StContainer = styled.div`
  position: absolute;
  top: 3.6rem;
  right: 3.6rem;
  display: flex;
`;
const StRadio = styled.input`
  display: none;
`;

const StRadioLabel = styled.label`
  cursor: pointer;
`;

const StRadioSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 2.4rem;
  color: ${({ theme }) => theme.colors.gray_500};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  ${({ theme }) => theme.fonts.body_12_medium};

  ${StRadio}:checked + & {
    color: ${({ theme }) => theme.colors.main_purple};
    border-color: ${({ theme }) => theme.colors.main_purple};
  }
`;

const StRadioSpanLeft = styled(StRadioSpan)`
  border-radius: 6px 0 0 6px;
`;

const StRadioSpanRight = styled(StRadioSpan)`
  border-radius: 0 6px 6px 0;
`;
