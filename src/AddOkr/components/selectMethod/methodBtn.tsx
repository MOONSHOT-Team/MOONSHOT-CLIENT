import styled from '@emotion/styled';

interface IMethodBtnProps {
  title: string;
  description: string;
  isClicked?: boolean;
}

const MethodBtn = ({ title, description, isClicked }: IMethodBtnProps) => {
  return (
    <StMethodBtn type="button" $isClicked={isClicked}>
      <StMethodBtnTitle>{title}</StMethodBtnTitle>
      <StMethodBtnDescription>{description}</StMethodBtnDescription>
    </StMethodBtn>
  );
};

export default MethodBtn;

const StMethodBtn = styled.button<{ $isClicked: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 40rem;
  height: 32rem;
  padding: 3.2rem 11.8rem 3.2rem 3rem;
  color: ${({ theme }) => theme.colors.gray_100};
  background-color: ${({ theme, $isClicked }) =>
    $isClicked ? theme.colors.transparent_purple : theme.colors.transparent_white};
  ${({ theme, $isClicked }) => $isClicked && `outline: 1px solid ${theme.colors.main_darkpurple}`};

  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.transparent_purple};
    outline: 1px solid ${({ theme }) => theme.colors.main_darkpurple};
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
