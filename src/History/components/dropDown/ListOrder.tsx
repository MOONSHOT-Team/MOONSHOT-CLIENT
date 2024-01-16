import styled from '@emotion/styled';

import { FilteringIcon } from '../../assets/icons';

const ListOrder = () => {
  return (
    <StAlignFilter>
      <span>최신순</span>
      <FilteringIcon />
    </StAlignFilter>
  );
};

export default ListOrder;

const StAlignFilter = styled.button`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  height: 1.7rem;
  margin-top: 1.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};
`;
