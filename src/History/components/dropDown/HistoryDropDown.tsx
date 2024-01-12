import styled from '@emotion/styled';
const HistoryDropDown = (props: { visibility: boolean; children: React.ReactNode }) => {
  return (
    <div>
      <StArticle>{props.visibility && props.children}</StArticle>
    </div>
  );
};

export default HistoryDropDown;
const StArticle = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-top: 1.6rem;
`;
