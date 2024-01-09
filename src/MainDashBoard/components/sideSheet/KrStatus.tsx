import styled from '@emotion/styled';

import { IcDropDownThin, IcOnGoingState } from '../../assets/icons';

const KrStatus = () => {
  return (
    <StContainer>
      <StState>
        <IcOnGoingState />
        진행
      </StState>

      <span>
        <IcDropDownThin />
      </span>
    </StContainer>
  );
};

export default KrStatus;

const StContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 7.4rem;
  height: 2.4rem;
  padding: 0.6rem;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 3px;
`;

const StState = styled.span`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  color: ${({ theme }) => theme.colors.sub_yellow};
  ${({ theme }) => theme.fonts.btn_11_semibold};
`;
