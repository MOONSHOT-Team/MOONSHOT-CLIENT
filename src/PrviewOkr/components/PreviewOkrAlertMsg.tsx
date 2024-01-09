import styled from '@emotion/styled';

const PreviewOkrAlertMsg = () => {
  return (
    <StAlertMsgBox>
      <p>
        ‘저장하기’ 버튼을 누른 후 목표(O), Tasks에 대한 수정은 불가능하며, KR에 대한 목표 수치는
        수정이 가능합니다.
      </p>
    </StAlertMsgBox>
  );
};

export default PreviewOkrAlertMsg;

const StAlertMsgBox = styled.div`
  width: 38rem;
  height: 7.4rem;
  padding: 1.7rem 1.4rem 1.7rem 1.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.transparent_red_10};
  border-radius: 8px;

  ${({ theme }) => theme.fonts.body_14_regular};
`;
