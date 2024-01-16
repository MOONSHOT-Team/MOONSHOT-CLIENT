/** 카테고리에 맞는 컬러코드를 반환하는 함수입니다 */
import { GOAL_CATEGORY } from '@constants/GOAL_CATEGORY';

export const getCategoryColor = (category: string) => {
  const color = GOAL_CATEGORY.find((cate) => cate.category === category)?.color;
  return color;
};
