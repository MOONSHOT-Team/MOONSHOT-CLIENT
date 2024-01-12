import styled from '@emotion/styled';

import { IcCheck } from '../../assets/icons';

interface IObjCategTagProps {
  text: string;
  isClicked: boolean;
}

const ObjCategTag = ({ text, isClicked }: IObjCategTagProps) => {
  return (
    <StObjCategTagBox $isClicked={isClicked}>
      {isClicked && <IcCheck />}
      <StObjCategText>{text}</StObjCategText>
    </StObjCategTagBox>
  );
};

export default ObjCategTag;

const StObjCategTagBox = styled.div<{ $isClicked: boolean }>`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: ${({ $isClicked }) => ($isClicked ? `1rem 1.5rem` : `1rem 2rem`)};
  background-color: ${({ theme, $isClicked }) =>
    $isClicked ? theme.colors.transparent_purple : theme.colors.background};
  border: 1px solid
    ${({ theme, $isClicked }) =>
      $isClicked ? theme.colors.main_darkpurple : theme.colors.gray_350};
  border-radius: 6px;

  &:hover {
    background: ${({ theme, $isClicked }) => !$isClicked && theme.colors.gray_550};
  }
`;

const StObjCategText = styled.p`
  color: ${({ theme }) => theme.colors.gray_100};
  ${({ theme }) => theme.fonts.btn_14_medium};
`;
