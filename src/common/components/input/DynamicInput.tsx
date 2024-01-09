import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const DynamicInput = ({ defaultValue }: { defaultValue?: string }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '');
  const [width, setWidth] = useState(0);

  const mirrorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!mirrorRef.current) return;
    setWidth(mirrorRef.current.clientWidth);
  }, [value]);

  return (
    <div css={dynamicInputContainerStyle}>
      <StDynamicInput
        type="text"
        width={width}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
  width: ${({ width }) => width}px;
  color: ${({ theme }) => theme.colors.gray_000};
  text-align: center;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_000};
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
