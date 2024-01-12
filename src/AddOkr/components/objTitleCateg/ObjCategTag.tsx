import styled from '@emotion/styled';

interface IObjCategTagProps {
  text: string;
  isClicked: boolean;
}

const ObjCategTag = ({ text, isClicked }: IObjCategTagProps) => {
  return (
    <ObjCategTagBox $isClicked={isClicked}>
      <span>{text}</span>
    </ObjCategTagBox>
  );
};

export default ObjCategTag;

const ObjCategTagBox = styled.div<{ $isClicked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.5rem;
  height: 3.4rem;
  color: ${({ theme }) => theme.colors.gray_100};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray_350};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_14_medium};

  &:hover {
    background: ${({ theme }) => theme.colors.gray_550};
  }
`;
