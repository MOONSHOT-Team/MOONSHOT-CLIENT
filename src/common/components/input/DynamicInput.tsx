import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';

interface IDynamicInputProps {
  value?: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  isAutoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DynamicInput = ({
  value,
  handleChangeValue,
  maxLength,
  isAutoFocus = false,
  onKeyDown,
}: IDynamicInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAutoFocus) return;
    if (inputRef.current) inputRef.current.focus();
  }, [isAutoFocus]);

  return (
    <div css={dynamicInputContainerStyle}>
      <StDynamicInput
        type="text"
        value={value}
        onChange={handleChangeValue}
        ref={inputRef}
        maxLength={maxLength}
        onKeyDown={(e) => {
          e.stopPropagation();
          onKeyDown?.(e);
        }}
        size={1}
      />
      <StInputMirror aria-hidden>{value}</StInputMirror>
    </div>
  );
};

export default DynamicInput;

const dynamicInputContainerStyle = css`
  display: table;
`;

const StDynamicInput = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray_000};
  text-align: center;
  background-color: transparent;
  border: none;
  outline: none;

  ${({ theme }) => theme.fonts.body_13_medium};

  &:focus {
    height: 100%;

    /* 입력시 배경 색 바뀌는 것이 자연스럽지 않아 일단 보류 */

    /* background-color: ${({ theme }) => theme.colors.gray_550}; */
    border: none;
  }
`;

const StInputMirror = styled.div`
  display: block;
  width: fit-content;
  min-width: 1rem;
  height: 0;
  padding: 0 0.2rem;
  visibility: hidden;
  outline: none;
  ${({ theme }) => theme.fonts.body_13_medium};
`;
