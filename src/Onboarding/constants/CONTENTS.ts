import { ColorsTypes } from '@styles/theme';

type ContentsTypes = {
  title: string;
  subTitleColor?: keyof ColorsTypes;
  subTitle?: string;
  description?: string;
};

export const CONTENTS: ContentsTypes[] = [
  {
    title: '당신의 모든 도전을\n하나의 대시보드에서 관리, 추적, 달성.',
  },
  {
    subTitle: 'OKR tree',
    subTitleColor: 'main_purple',
    title: '한 눈에 확인 가능한 흩어져 있는 목표들',
    description:
      '다양한 목표, 수많은 할 일에 매몰되어 목표를 달성하기 어려웠나요?\n모든 목표와 할 일들을 하나의 대시보드에 모아 목표 달성 과정을 한 눈에 확인하며 목표 달성에 집중하세요',
  },
  {
    subTitle: '목표 설정',
    subTitleColor: 'sub_pink',
    title: '목표와 핵심 지표들을\n더욱 쉽고, 바르고, 의미있게',
    description:
      '문샷과 함께라면 OKR을 잘 알지 못해도 목표를 쉽고, 바르게 설정할 수 있습니다\n고민의 순간들이 모여 도전적인 목표를 이루는 여정에 문샷이 함께할게요',
  },
  {
    subTitle: 'KR 체크인',
    subTitleColor: 'sub_mint',
    title: '성취를 기록하고, 환경에 따라 수정하기',
    description:
      '체크인을 통해 현재 목표를 위한 과정이 잘 진행되고 있는지, 지연/중단된 목표는 없는지 진행상태를 살펴보세요\n회고를 작성하며 현재의 방법이 최선인지, 다른 접근 방식을 시도해야 하는 것은 아닌지 검토할 수 있습니다',
  },
  {
    subTitle: 'History',
    subTitleColor: 'sub_blue',
    title: '달성한 목표를 확인하며\n앞으로 나아갈 원동력을 얻을 수 있도록',
    description: '꾸준함으로 쌓인 발자취를 확인하며 앞으로의 미래를 향해 다시 나아가보세요',
  },
];
