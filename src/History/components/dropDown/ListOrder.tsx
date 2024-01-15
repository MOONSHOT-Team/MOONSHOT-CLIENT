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
  justify-content: end;
  height: 1.7rem;
  margin: 0 0.9rem 1.2rem 0;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};
`;
