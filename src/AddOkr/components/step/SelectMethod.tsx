import { css } from '@emotion/react';
import React, { useState } from 'react';

import { SELECT_METHOD_OPTIONS } from '../../constants/SELECT_METHOD_OPTIONS';
import MethodBtn from '../selectMethod/methodBtn';

const SelectMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleClickMethodBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setSelectedMethod(target.id);
  };

  return (
    <section css={SelectMethodContainer}>
      {SELECT_METHOD_OPTIONS.map(({ title, description }) => {
        return (
          <MethodBtn
            key={title}
            title={title}
            description={description}
            handleClickMethodBtn={handleClickMethodBtn}
            isClicked={selectedMethod === title}
          />
        );
      })}
    </section>
  );
};

export default SelectMethod;

const SelectMethodContainer = css`
  display: flex;
  gap: 1.8rem;
  width: 100%;
  height: 100%;
  padding: 17rem 18.6rem 20.2rem 13rem;
`;
