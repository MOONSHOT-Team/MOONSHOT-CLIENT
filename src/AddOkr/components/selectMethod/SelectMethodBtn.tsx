import styled from '@emotion/styled';

interface IMethodBtnProps {
  title: string;
  description: string;
  handleClickMethodBtn: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isClicked?: boolean;
}

const SelectMethodBtn = ({
  title,
  description,
  isClicked,
  handleClickMethodBtn,
}: IMethodBtnProps) => {
  return (
    <StMethodBtn id={title} type="button" $isClicked={isClicked} onClick={handleClickMethodBtn}>
      <StMethodBtnTitle>{title}</StMethodBtnTitle>
      <StMethodBtnDescription>{description}</StMethodBtnDescription>
    </StMethodBtn>
  );
};

export default SelectMethodBtn;

const StMethodBtn = styled.button<{ $isClicked: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  justify-content: flex-start;
  width: 40rem;
  height: 32rem;
  padding: 3.2rem 11.8rem 3.2rem 3rem;
  color: ${({ theme }) => theme.colors.gray_100};
  text-align: start;
  background-color: ${({ theme, $isClicked }) =>
    $isClicked ? theme.colors.transparent_purple : theme.colors.transparent_white};
  ${({ theme, $isClicked }) => $isClicked && `outline: 1px solid ${theme.colors.main_darkpurple}`};

  border-radius: 8px;

  &:hover {
    background-color: ${({ theme, $isClicked }) => !$isClicked && theme.colors.gray_500};
    outline: none;
  }
`;

const StMethodBtnTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_100};
  ${({ theme }) => theme.fonts.title_20_semibold};
`;

const StMethodBtnDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray_100};
  ${({ theme }) => theme.fonts.body_10_regular};
`;
