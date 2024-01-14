import styled from '@emotion/styled';

import { IcPlusExtraLarge } from '../../assets';

const KeyResultPlusCard = () => {
  return (
    <StKeyResultPlusCardContainer>
      <IcPlusExtraLarge />
      <p>추가하기 (선택)</p>
    </StKeyResultPlusCardContainer>
  );
};

export default KeyResultPlusCard;

const StKeyResultPlusCardContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  align-items: center;
  justify-content: center;
  width: 34.7rem;
  height: 29.8rem;
  color: ${({ theme }) => theme.colors.gray_100};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_450};
  }

  ${({ theme }) => theme.fonts.body_10_regular};
`;
