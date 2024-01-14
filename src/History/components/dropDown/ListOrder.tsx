import styled from '@emotion/styled';

import { FilteringIcon } from '../../assets/icons';

const ListOrder = () => {
  return (
    <StAlignFilter>
      최신순 <FilteringIcon />
    </StAlignFilter>
  );
};

export default ListOrder;

const StAlignFilter = styled.button`
  display: flex;
  gap: 0.4rem;
  height: 1.7rem;
  margin-right: 0.9rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};
`;
