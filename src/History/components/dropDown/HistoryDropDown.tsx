import styled from '@emotion/styled';
const HistoryDropDown = (props: { visibility: boolean; children: React.ReactNode }) => {
  return (
    <div>
      <StArticle>{props.visibility && props.children}</StArticle>
    </div>
  );
};

export default HistoryDropDown;
const StArticle = styled.article`
  color: ${({ theme }) => theme.colors.gray_000};
`;
