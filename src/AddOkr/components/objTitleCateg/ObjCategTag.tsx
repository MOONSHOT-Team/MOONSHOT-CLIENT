import styled from '@emotion/styled';

import { IcCheck } from '../../assets/icons';

interface IObjCategTagProps {
  id: string;
  text: string;
  isClicked: boolean;
  handleClickObjTag: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleHoverObjCateg: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleMouseLeaveObjCateg: () => void;
}

const ObjCategTag = ({
  id,
  text,
  isClicked,
  handleClickObjTag,
  handleHoverObjCateg,
  handleMouseLeaveObjCateg,
}: IObjCategTagProps) => {
  return (
    <StObjCategTagBox
      $isClicked={isClicked}
      id={id}
      onClick={handleClickObjTag}
      onMouseEnter={handleHoverObjCateg}
      onMouseLeave={handleMouseLeaveObjCateg}
    >
      {isClicked && <IcCheck />}
      <StObjCategText>{text}</StObjCategText>
    </StObjCategTagBox>
  );
};

export default ObjCategTag;

const StObjCategTagBox = styled.button<{ $isClicked: boolean }>`
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
