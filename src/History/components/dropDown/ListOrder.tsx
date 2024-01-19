import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { FilteringIcon } from '../../assets/icons';
import { LIST_ORDER } from '../../constants/orderList';

interface IListOrderProps {
  onFilterSelection: (filter: string) => void;
}

const ListOrder: React.FC<IListOrderProps> = ({ onFilterSelection }) => {
  const initialFilter = '최신순'; // 초기 필터 값을 설정합니다.
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(initialFilter);

  const handleCurrentFilterClick = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleFilterClick = (filter: string) => {
    setCurrentFilter(filter);
    setIsFilterDropdownOpen(false);
    onFilterSelection(filter);
  };

  const filterOptions = LIST_ORDER.find(({ label }) => label === currentFilter)?.options || [];

  return (
    <div css={FilterContainer}>
      <StCurrentFilterBtn onClick={handleCurrentFilterClick}>
        {currentFilter} <FilteringIcon />
      </StCurrentFilterBtn>

      {isFilterDropdownOpen && (
        <StFilterWrapper>
          {filterOptions.map((filterOption, index) => (
            <React.Fragment key={filterOption}>
              <StRemainFilterButton onClick={() => handleFilterClick(filterOption)}>
                {filterOption}
              </StRemainFilterButton>
              {index < filterOptions.length - 1 && <StFilterBox />}{' '}
            </React.Fragment>
          ))}
        </StFilterWrapper>
      )}
    </div>
  );
};

export default ListOrder;

const FilterContainer = css`
  position: absolute;
  top: 5.6rem;
  right: 3.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 8.1rem;
`;

const StCurrentFilterBtn = styled.button`
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};
`;

const StFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 6.7rem;
  padding: 1.2rem 0.8rem;
  background-color: ${({ theme }) => theme.colors.gray_400};
  border-radius: 6px;
`;

const StRemainFilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const StFilterBox = styled.div`
  width: 6.5rem;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray_500};
`;
