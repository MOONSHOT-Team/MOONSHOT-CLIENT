import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { IcSmallDropDown } from '../../assets/icons';
import { FILTERS } from '../../constants/LIST_ORDER';
import { filterOptionTypes } from '../../type/historyData';

interface IFiltersProps {
  selectedFilter: filterOptionTypes;
  onFilterSelection: (filter: filterOptionTypes) => void;
}

const Filters = ({ selectedFilter, onFilterSelection }: IFiltersProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const restFilters = FILTERS.find(({ label }) => label === selectedFilter)?.options;

  const handleCurrentFilterClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleFilterClick = (filter: filterOptionTypes) => {
    setIsDropdownOpen(false);
    onFilterSelection(filter);
  };

  return (
    <div css={filterContainer}>
      <StDropDown onClick={handleCurrentFilterClick}>
        <span>{selectedFilter}</span>
        <StIcon isDropdownOpen={isDropdownOpen}>
          <IcSmallDropDown />
        </StIcon>
      </StDropDown>
      {isDropdownOpen && (
        <StRestFiltersWrapper>
          {restFilters?.map((filter) => (
            <StRestFilter key={filter} onClick={() => handleFilterClick(filter)}>
              {filter}
            </StRestFilter>
          ))}
        </StRestFiltersWrapper>
      )}
    </div>
  );
};

export default Filters;

const filterContainer = css`
  position: absolute;
  top: 5.6rem;
  right: 3.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 8.1rem;
`;

const StDropDown = styled.button`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};
`;

const StIcon = styled.div<{ isDropdownOpen: boolean }>`
  width: 1.6rem;
  height: 1.6rem;
  transition: all 0.3s ease;
  transform: ${({ isDropdownOpen }) => (isDropdownOpen ? 'rotate(-180deg)' : '')};
`;

const StRestFiltersWrapper = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 6.7rem;
  background-color: ${({ theme }) => theme.colors.gray_400};
  border-radius: 6px;

  button:first-of-type {
    position: relative;

    &::after {
      position: absolute;
      bottom: 0;
      width: 6.5rem;
      content: '';
      border-bottom: 0.1px solid ${({ theme }) => theme.colors.gray_500};
    }
  }
`;

const StRestFilter = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.3rem;
  padding: 1.2rem 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_12_regular};
`;
