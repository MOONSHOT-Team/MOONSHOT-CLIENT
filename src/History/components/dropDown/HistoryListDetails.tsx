import styled from '@emotion/styled';

const HistoryListDetails = (props: { visibility: boolean; children: React.ReactNode }) => {
  return (
    <>
      <StDropDownContent $isHide={props.visibility}>
        {props.visibility && props.children}
      </StDropDownContent>
    </>
  );
};

export default HistoryListDetails;

const StDropDownContent = styled.li<{ $isHide: boolean }>`
  display: ${({ $isHide }) => ($isHide ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1.6rem;
  padding-top: 1.6rem;
  margin-bottom: 4.6rem;
`;
