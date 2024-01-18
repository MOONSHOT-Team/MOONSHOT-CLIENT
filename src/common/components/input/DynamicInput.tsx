import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

interface IDynamicInputProps {
  value: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minWidth?: number;
  maxLength?: number;
  isAutoFocus?: boolean;
}

const DynamicInput = ({
  value,
  handleChangeValue,
  minWidth,
  maxLength,
  isAutoFocus = false,
}: IDynamicInputProps) => {
  const [width, setWidth] = useState(minWidth ? minWidth : 10);

  const mirrorRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!mirrorRef.current) return;
    setWidth(mirrorRef.current.offsetWidth);
  }, [value]);

  useEffect(() => {
    if (!mirrorRef.current) return;
    setWidth(mirrorRef.current.offsetWidth);

    if (!isAutoFocus) return;
    if (inputRef.current) inputRef.current.focus();
  }, [isAutoFocus]);

  return (
    <div css={dynamicInputContainerStyle}>
      <StDynamicInput
        type="text"
        width={width}
        value={value}
        onChange={handleChangeValue}
        ref={inputRef}
        maxLength={maxLength}
      />
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
  width: ${({ width }) => width / 10}rem;
  min-width: 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  text-align: center;
  background-color: transparent;
  border: none;
  outline: none;

  ${({ theme }) => theme.fonts.body_13_medium};

  &:focus {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.gray_550};
    border: none;
  }
`;

const StInputMirror = styled.div`
  display: inline-block;
  width: fit-content;
  min-width: 1rem;
  height: 0;
  padding: 0 0.2rem;
  visibility: hidden;
  outline: none;
  ${({ theme }) => theme.fonts.body_13_medium};
`;
