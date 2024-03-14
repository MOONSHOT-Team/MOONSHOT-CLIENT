import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface IAddKrModalProps {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>;
}

//TODO: 공통 컴포넌트 사용으로, 핸들러 완성 후 뷰 다시 확인하기
const AddKrModal = ({ modalRef }: IAddKrModalProps) => {
  // const [isValidMax] = useState({
  //   krTitle: false,
  //   krTarget: false,
  //   krMetric: false,
  // });

  // const handleChangeKrValues = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
  //   console.log(e, maxLength);
  //   const parsedValue = e.target.value.replace(/[^-0-9]/g, '');
  //   switch (e.target.name) {
  //     case 'krTarget':
  //       if (e.target.value.length > maxLength) {
  //         setIsValidMax({ ...isValidMax, [e.target.name]: true });
  //       }
  //       if (e.target.value.length <= maxLength) {
  //         setIsValidMax({ ...isValidMax, [e.target.name]: false });
  //         krListInfo[cardIdx].krTarget = parsedValue
  //           .toString()
  //           .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //         setKrListInfo([...krListInfo]);
  //       }
  //       break;
  //     default:
  //       if (e.target.value.length > maxLength) {
  //         setIsValidMax({ ...isValidMax, [e.target.name]: true });
  //       }
  //       if (e.target.value.length <= maxLength) {
  //         setIsValidMax({ ...isValidMax, [e.target.name]: false });
  //         krListInfo[cardIdx] = { ...krListInfo[cardIdx], [e.target.name]: e.target.value };
  //         setKrListInfo([...krListInfo]);
  //       }
  //       break;
  //   }
  // };

  //TODO: add-okr의 kr 카드와 공통 컴포넌트로 만들어 추상화 하기
  return (
    <Modal ref={modalRef}>
      <StAddKrModalWrapper>
        <StAddKrModalTitle>KR 추가하기</StAddKrModalTitle>
        {/* <AddKrForm
          $gap={'3.2rem'}
          $inputStyle={{
            longWidth: '40rem',
            shortWidth: '19.4rem',
            height: '3.6rem',
            shortGap: '1.2rem',
          }}
          isValidMax={isValidMax}
          handleChangeKrValues={handleChangeKrValues}
        /> */}

        <div css={AddKrModalBtnContainer}>
          <StAddKrCancelBtn type="button" onClick={() => modalRef.current?.close()}>
            취소하기
          </StAddKrCancelBtn>
          <StAddKrConfirmAddBtn type="button" $isActiveAdd={true}>
            추가하기
          </StAddKrConfirmAddBtn>
        </div>
      </StAddKrModalWrapper>
    </Modal>
  );
};

export default AddKrModal;

const StAddKrModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  align-items: center;

  /* justify-content: center; */
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

const AddKrModalBtnContainer = css`
  display: flex;
  gap: 1.2rem;
  margin-top: 1rem;
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
