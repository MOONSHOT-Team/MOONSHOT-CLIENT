import { css } from '@emotion/react';

import { SELECT_METHOD_OPTIONS } from '../../constants/ADD_OKR_METHOD_N_STEP';
import SelectMethodBtn from '../selectMethod/SelectMethodBtn';

interface ISelectMethodProps {
  selectedMethod: string;
  handleClickMethodBtn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const SelectMethod = ({ selectedMethod, handleClickMethodBtn }: ISelectMethodProps) => {
  return (
    <>
      <section css={SelectMethodContainer}>
        {SELECT_METHOD_OPTIONS.map(({ title, description }) => {
          return (
            <SelectMethodBtn
              key={title}
              title={title}
              description={description}
              handleClickMethodBtn={handleClickMethodBtn}
              isClicked={selectedMethod === title}
            />
          );
        })}
      </section>
    </>
  );
};

export default SelectMethod;

const SelectMethodContainer = css`
  display: flex;
  gap: 1.8rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 17rem 18.6rem 20.2rem 13rem;
`;
