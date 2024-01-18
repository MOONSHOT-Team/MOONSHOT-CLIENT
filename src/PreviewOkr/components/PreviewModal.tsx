import { css } from '@emotion/react';
import styled from '@emotion/styled';

const IS_GUIDE = '가이드에 따라 설정하기';

const PreviewModal = ({ selectedMethod }: { selectedMethod: string }) => {
  const progressStep = selectedMethod === IS_GUIDE ? '6/6' : '5/5';

  return (
    <>
      <div css={modalForm}>
        <AddOkrOptionText>{selectedMethod}</AddOkrOptionText>
        <StMainTextContainer>
          <p>목표 저장 전 내용을 수정하고</p>
          <p>KR을 달성할 수 있는 task를 추가해보세요!</p>
        </StMainTextContainer>
        <StSubTextContainer>
          <p>KR에서는 수치값을 제외한 텍스트만 수정이 가능하며,</p>
          <p>task는 KR 당 최대 3개까지 추가 가능합니다.</p>
        </StSubTextContainer>
        <form method="dialog">
          <StConfirmButton>확인</StConfirmButton>
        </form>
        <ProgressBox>
          <ProgressRightText>{progressStep}</ProgressRightText>
        </ProgressBox>
      </div>
    </>
  );
};

export default PreviewModal;

const modalForm = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 7rem 0 6.9rem;
`;

const AddOkrOptionText = styled.p`
  ${({ theme }) => theme.fonts.body_12_medium};

  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray_300};
`;

const StMainTextContainer = styled.div`
  ${({ theme }) => theme.fonts.title_20_semibold};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 4.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
`;

const StSubTextContainer = styled.div`
  ${({ theme }) => theme.fonts.body_14_regular};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5.4rem;
  color: ${({ theme }) => theme.colors.gray_150};
`;

const StConfirmButton = styled.button`
  ${({ theme }) => theme.fonts.btn_14_semibold};

  display: flex;
  align-items: center;
  justify-content: center;
  width: 17.8rem;
  height: 3.4rem;
  margin-bottom: 6rem;
  color: ${({ theme }) => theme.colors.gray_650};
  background-color: ${({ theme }) => theme.colors.gray_100};
  border-radius: 6px;

  &:focus {
    outline: none;
  }
`;

const ProgressBox = styled.div`
  position: relative;
  width: 38rem;
  height: 0.8rem;
  background-color: ${({ theme }) => theme.colors.gray_250};
  border-radius: 4px;
`;

const ProgressText = styled.span`
  ${({ theme }) => theme.fonts.btn_11_medium};

  position: absolute;
  top: 1.6rem;
  color: ${({ theme }) => theme.colors.gray_300};
`;

const ProgressRightText = styled(ProgressText)`
  right: 0;
`;
