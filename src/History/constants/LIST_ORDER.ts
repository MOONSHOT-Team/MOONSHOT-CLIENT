interface ListOrderType {
  label: string;
  options: string[];
}
export const LIST_ORDER: ListOrderType[] = [
  { label: '최신순', options: ['오래된 순', '달성률 순'] },
  { label: '달성률 순', options: ['최신순', '오래된 순'] },
  { label: '오래된 순', options: ['달성률순', '최신순'] },
];
