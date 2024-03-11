import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface IAddKrModalProps {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>;
}

//힌트 메시지 상수
const HINT_TITLE = 'ex) 개발 관련 아티클 읽기';
const HINT_TARGET = 'ex) 10';
const HINT_METRIC = 'ex) 회';

const AddKrModal = ({ modalRef }: IAddKrModalProps) => {
  //TODO: add-okr의 kr 카드와 공통 컴포넌트로 만들어 추상화 하기
  return (
    <Modal ref={modalRef}>
      <StAddKrModalWrapper>
        <StAddKrModalTitle>KR 추가하기</StAddKrModalTitle>

        <div css={AddKrInputContainer}>
          <StAddKrInputDescription>핵심 지표를 문장으로 정리해볼까요?</StAddKrInputDescription>
          <StKrTitleInput placeholder={HINT_TITLE} />
        </div>
        <div css={AddKrInputContainer}>
          <StAddKrInputDescription>
            핵심 지표를 측정할 수치값과 단위를 입력해주세요
          </StAddKrInputDescription>
          <div css={TargetMetricInputContainer}>
            <StTaretMetricInput placeholder={HINT_TARGET} />
            <StTaretMetricInput placeholder={HINT_METRIC} />
          </div>
        </div>
        <div css={AddKrInputContainer}>
          <StAddKrInputDescription>핵심 지표를 달성할 기간을 입력해주세요.</StAddKrInputDescription>
          <StKrPeriodBox>YYYY. MM. DD - YYYY. MM. DD</StKrPeriodBox>
        </div>

        <div css={AddKrModalBtnContainer}>
          <StAddKrCancelBtn>취소하기</StAddKrCancelBtn>
          <StAddKrConfirmAddBtn $isActiveAdd={true}>추가하기</StAddKrConfirmAddBtn>
        </div>
      </StAddKrModalWrapper>
    </Modal>
  );
};

export default AddKrModal;

const StAddKrModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: center;
  justify-content: center;
  width: 47.6rem;
  height: 47.6rem;
  padding: 3.4rem 3.8rem 3.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.gray_550};
  border-radius: 10px;
`;

const StAddKrModalTitle = styled.p`
  ${({ theme }) => theme.fonts.title_16_semibold};
`;

const AddKrInputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StAddKrInputDescription = styled.p`
  ${({ theme }) => theme.fonts.body_14_semibold};
`;

const StAddKCommonInputStyle = styled.input`
  height: 3.6rem;
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_350};
  }
`;

const StKrTitleInput = styled(StAddKCommonInputStyle)`
  width: 40rem;
`;

const TargetMetricInputContainer = css`
  display: flex;
  gap: 1rem;
`;

const StTaretMetricInput = styled(StAddKCommonInputStyle)`
  width: 19.5rem;
`;

const StKrPeriodBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 3.6rem;
  color: ${({ theme }) => theme.colors.gray_450};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};
`;

const AddKrModalBtnContainer = css`
  display: flex;
  gap: 1.2rem;
`;

const StAddKrModalBtnStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 19.4rem;
  height: 3.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_14_semibold};

  &:focus {
    border: none;
    outline: none;
  }
`;

const StAddKrCancelBtn = styled(StAddKrModalBtnStyle)`
  background-color: ${({ theme }) => theme.colors.gray_450};
`;

const StAddKrConfirmAddBtn = styled(StAddKrModalBtnStyle)<{ $isActiveAdd: boolean }>`
  background-color: ${({ theme, $isActiveAdd }) =>
    $isActiveAdd ? theme.colors.main_darkpurple : theme.colors.gray_450};
`;
