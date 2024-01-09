import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

interface IDynamicInputProps {
  value: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DynamicInput = ({ value, handleChangeValue }: IDynamicInputProps) => {
  const [width, setWidth] = useState(0);

  const mirrorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!mirrorRef.current) return;
    setWidth(mirrorRef.current.offsetWidth);
  }, [value]);

  useEffect(() => {
    if (!mirrorRef.current) return;
    setWidth(mirrorRef.current.offsetWidth);
  }, []);

  return (
    <div css={dynamicInputContainerStyle}>
      <StDynamicInput type="text" width={width} value={value} onChange={handleChangeValue} />
      <StInputMirror ref={mirrorRef} aria-hidden>
        {value}
      </StInputMirror>
    </div>
  );
};

export default DynamicInput;

const dynamicInputContainerStyle = css`
  display: flex;
  flex-direction: column;
`;

const StDynamicInput = styled.input<{ width: number }>`
  width: ${({ width }) => width}px;
  color: ${({ theme }) => theme.colors.gray_000};
  text-align: center;
  background-color: transparent;
  border: none;
  outline: none;

  ${({ theme }) => theme.fonts.body_13_medium};
`;

const StInputMirror = styled.div`
  display: inline-block;
  width: fit-content;
  height: 0;
  padding: 0 0.2rem;
  visibility: hidden;
  outline: none;
  ${({ theme }) => theme.fonts.body_13_medium};
`;
