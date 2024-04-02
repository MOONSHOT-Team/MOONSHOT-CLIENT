import { filterOptionTypes } from '..';

interface filtersTypes {
  label: filterOptionTypes;
  options: filterOptionTypes[];
}

export const FILTERS: filtersTypes[] = [
  { label: '최신순', options: ['오래된 순', '달성률 순'] },
  { label: '달성률 순', options: ['최신순', '오래된 순'] },
  { label: '오래된 순', options: ['달성률 순', '최신순'] },
];
