import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { filterOptionTypes } from '../..';
import { IcSmallDropDown } from '../../assets/icons';
import { LIST_ORDER } from '../../constants/LIST_ORDER';

interface IListOrderProps {
  selectedFilter: filterOptionTypes;
  onFilterSelection: (filter: filterOptionTypes) => void;
}

const ListOrder = ({ selectedFilter, onFilterSelection }: IListOrderProps) => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterOptions = LIST_ORDER.find(({ label }) => label === selectedFilter)?.options || [];

  const handleCurrentFilterClick = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleFilterClick = (filter: filterOptionTypes) => {
    setIsFilterDropdownOpen(false);
    onFilterSelection(filter);
  };

  return (
    <div css={filterContainer}>
      <StCurrentFilterBtn onClick={handleCurrentFilterClick}>
        <span>{selectedFilter}</span>
        <StFilteringIcon isFilterDropdownOpen={isFilterDropdownOpen} />
      </StCurrentFilterBtn>

      {isFilterDropdownOpen && (
        <StFilterWrapper>
          {filterOptions.map((filterOption, index) => (
            <React.Fragment key={filterOption}>
              <StRemainFilterButton onClick={() => handleFilterClick(filterOption)}>
                {filterOption}
              </StRemainFilterButton>
              {index !== filterOptions.length - 1 && <StHorizonLine />}
            </React.Fragment>
          ))}
        </StFilterWrapper>
      )}
    </div>
  );
};

export default ListOrder;

const filterContainer = css`
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
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};
`;

const StFilteringIcon = styled(IcSmallDropDown)<{ isFilterDropdownOpen: boolean }>`
  transition: all 0.3s ease;
  transform: ${({ isFilterDropdownOpen }) => (isFilterDropdownOpen ? 'rotate(-180deg)' : '')};
`;

const StFilterWrapper = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 6.7rem;
  background-color: ${({ theme }) => theme.colors.gray_400};
  border-radius: 6px;
`;

const StRemainFilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.3rem;
  padding: 1.2rem 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_12_regular};
`;

const StHorizonLine = styled.div`
  width: 6.5rem;
  height: 0.1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_500};
`;
