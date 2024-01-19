import { IcNotice } from '@assets/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const PreviewOkrAlertMsg = () => {
  return (
    <StAlertMsgBox>
      <i css={noticeIconStyle}>
        <IcNotice />
      </i>
      <p css={AlertMsgTxt}>
        {
          '목표 저장 이후 목표(O)와 Tasks는 수정이 불가능하며\n KR에 대한 수치값은 체크인을 통해 수정 가능해요'
        }
      </p>
    </StAlertMsgBox>
  );
};

export default PreviewOkrAlertMsg;

const StAlertMsgBox = styled.div`
  position: absolute;
  top: 2rem;
  left: 3.6rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 38rem;
  height: 7.4rem;
  padding: 1.7rem 1.4rem 1.7rem 1.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.transparent_red_10};
  border-radius: 8px;

  ${({ theme }) => theme.fonts.body_14_regular};
`;

const noticeIconStyle = css`
  width: 2.4rem;
  height: 2.4rem;
`;

const AlertMsgTxt = css`
  white-space: pre-line;
`;
