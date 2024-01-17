import styled from '@emotion/styled';

import { IcPlusExtraLarge } from '../../assets/icons';
import { EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';

const KeyResultPlusCard = () => {
  return (
    <StKeyResultPlusCardContainer>
      <IcPlusExtraLarge />
      <p>추가하기 (선택)</p>
    </StKeyResultPlusCardContainer>
  );
};

export default KeyResultPlusCard;

const StKeyResultPlusCardContainer = styled(EmptyKeyResultCard)`
  gap: 0.9rem;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray_100};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray_600};

  ${({ theme }) => theme.fonts.body_10_regular};
`;
