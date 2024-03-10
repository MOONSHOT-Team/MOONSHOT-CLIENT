import { userImg1, userImg2, userImg3, userImg4 } from '../assets/imgs/index';

export const MOCK_SOCIAL_DATA = [
  {
    //1
    category: '성장',
    userName: '실용주의자',
    userImg: userImg1,
    like: 132,
    userIntro: '웹 개발자/TEAM moonshot에서 일하고 있습니다',
    okrTreeData: {
      objTitle: '영향력있는 개발자 되기',
      objCategory: '성장',
      objContent: '이루지 못하는 목표는 없다.',
      objStartAt: '2024-01-05T00:00:00',
      objExpireAt: '2024-01-30T00:00:00',
      krList: [
        {
          krTitle: '자랑할 수 있는 어플리케이션 만들어보기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 0,
          krIdx: 0,
          krTarget: 1,
          krMetric: '회',
          taskList: [
            {
              taskTitle: '코드 리뷰 피드백을 주 2회 이상 검토하기',
              taskIdx: 0,
            },
            {
              taskTitle: '피드백을 반영하여 코드 개선하기',
              taskIdx: 1,
            },
            {
              taskTitle: '해커톤 참여하기',
              taskIdx: 2,
            },
          ],
        },
        {
          krTitle: '개발 관련 아티클 읽기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 1,
          krIdx: 1,
          krTarget: 10,
          krMetric: '회',
          taskList: [
            {
              taskTitle: '아티클 스터디 참여하기',
              taskIdx: 0,
            },
            {
              taskTitle: '주 1회 이상 아티클 읽는 시간 확보하기',
              taskIdx: 1,
            },
            {
              taskTitle: '읽은 아티클에 노션에 요약 정리하기',
              taskIdx: 2,
            },
          ],
        },
        {
          krTitle: '코테 문제 풀기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 2,
          krIdx: 2,
          krTarget: 5,
          krMetric: '회',
          taskList: [
            {
              taskTitle: '백준 문제 풀기',
              taskIdx: 0,
            },
            {
              taskTitle: '매일 2시간코딩 연습하기',
              taskIdx: 1,
            },
            {
              taskTitle: '코딩 연습 결과를 기록하고 복습하기',
              taskIdx: 2,
            },
          ],
        },
      ],
    },
  },
  //2
  {
    category: '경제',
    userName: '트렌드세터',
    userImg: userImg2,
    like: 129,
    userIntro: 'ESTJ/목표를 성취하는 과정에서 짜릿함을 느껴요',
    okrTreeData: {
      objTitle: '전세 자금 마련하기',
      objCategory: '경제',
      objContent: '할 수 있다면 할 수 있다',
      objStartAt: '2024-01-05T00:00:00',
      objExpireAt: '2024-01-30T00:00:00',
      krList: [
        {
          krTitle: '저축 계획 수립하여 저축하기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 3,
          krIdx: 0,
          krTarget: 5000,
          krMetric: '원',
          taskList: [
            {
              taskTitle: '주 1회 20만원씩 저축하기', //값 없다면 빈 string('') 값으로, 형식은 유지
              taskIdx: 0,
            },
            {
              taskTitle: '월별 지출을 기록하기',
              taskIdx: 1,
            },
            {
              taskTitle: '급여날마다 지출 계획 세우기',
              taskIdx: 2,
            },
          ],
        },
        {
          krTitle: '부가적인 수입원 발굴을 위해 부업으로 확보하기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 4,
          krIdx: 1,
          krTarget: 50,
          krMetric: '만원',
          taskList: [
            {
              taskTitle: '부업 모델 선정하기',
              taskIdx: 0,
            },
            {
              taskTitle: '주 10시간 부업에 투자하기',
              taskIdx: 1,
            },
            {
              taskTitle: '부업 시간 계획 세우기',
              taskIdx: 2,
            },
          ],
        },
        {
          krTitle: '지출 절감하기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 5,
          krIdx: 2,
          krTarget: 100000,
          krMetric: '원',
          taskList: [
            {
              taskTitle: '불필요한 구독 서비스 줄이기',
              taskIdx: 0,
            },
            {
              taskTitle: '절약할 수 있는 대체 방안 찾아보기',
              taskIdx: 1,
            },
            {
              taskTitle: '절약을 기록하는 가계부 사용하기',
              taskIdx: 2,
            },
          ],
        },
      ],
    },
  },
  //3
  {
    category: '성장',
    userName: '인프피디자이너',
    userImg: userImg3,
    like: 118,
    userIntro: '마케터/트렌드를 읽고 있습니다',
    okrTreeData: {
      objTitle: '리더십 및 커뮤니케이션 기술 향상',
      objCategory: '성장',
      objContent: '성장이 뭔지 보여줄게',
      objStartAt: '2024-01-05T00:00:00',
      objExpireAt: '2024-01-30T00:00:00',
      krList: [
        {
          krTitle: '리더십 관련 도서 읽기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 6,
          krIdx: 0,
          krTarget: 3,
          krMetric: '권',
          taskList: [
            {
              taskTitle: '매주 한 권의 리더십 관련 도서 읽기', //값 없다면 빈 string('') 값으로, 형식은 유지
              taskIdx: 0,
            },
            {
              taskTitle: '도서를 읽은 후 요약하기',
              taskIdx: 1,
            },
            {
              taskTitle: '리더십 기술 향상을 위한 액션 아이템 리스트 작성하기',
              taskIdx: 2,
            },
          ],
        },
        {
          krTitle: '주변 사람들에게 짧은 발표 연습하기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 7,
          krIdx: 1,
          krTarget: 5,
          krMetric: '회',
          taskList: [
            {
              taskTitle: '매주 3분 내외의 발표 진행하기',
              taskIdx: 0,
            },
            {
              taskTitle: '발표 기술 향상을 위한 개선점 파악하기',
              taskIdx: 1,
            },
            {
              taskTitle: '발표 기회를 찾아 참여하기',
              taskIdx: 2,
            },
          ],
        },
        {
          krTitle: '리더 역할 맡기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 8,
          krIdx: 2,
          krTarget: 2,
          krMetric: '회',
          taskList: [
            {
              taskTitle: '팀 내에서 프로젝트 리더로 선정되도록 노력하기',
              taskIdx: 0,
            },
            {
              taskTitle: '프로젝트 일정 관리 효율적으로 수행하기',
              taskIdx: 1,
            },
            {
              taskTitle: '팀 내 소통을 위해 빠르게 연락 확인하기',
              taskIdx: 2,
            },
          ],
        },
      ],
    },
  },
  //4
  {
    category: '라이프스타일',
    userName: '나노플래너',
    userImg: userImg4,
    like: 70,
    userIntro: '매일 긍정적으로 생각해요',
    okrTreeData: {
      objTitle: '라이프 스타일 개선',
      objCategory: '라이프스타일',
      objContent: '점점 개선되는 모습을 보고 싶다',
      objStartAt: '2024-01-05T00:00:00',
      objExpireAt: '2024-01-30T00:00:00',
      krList: [
        {
          krTitle: '균형 잡힌 식사 섭취',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 9,
          krIdx: 0,
          krTarget: 10,
          krMetric: '회',
          taskList: [
            {
              taskTitle: '하루 1끼 식사를 균형 있게 섭취하기',
              taskIdx: 0,
            },
            {
              taskTitle: '불필요한 과자류나 당류 섭취 줄이기',
              taskIdx: 1,
            },
            {
              taskTitle: '식습관을 추적하고 기록하는 앱 사용하기',
              taskIdx: 2,
            },
          ],
        },
        {
          krTitle: '명상 또는 마음을 진정시키는 시간 확보하기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 10,
          krIdx: 1,
          krTarget: 10,
          krMetric: '시간',
          taskList: [
            {
              taskTitle: '하루에 30분 이상 산책하기',
              taskIdx: 0,
            },
            {
              taskTitle: '명상 가이드로 스트레스 완화 방법 습득하기',
              taskIdx: 1,
            },
            {
              taskTitle: '스트레스를 유발하는 요소 최소화하기',
              taskIdx: 2,
            },
          ],
        },
        {
          krTitle: '운동 하기',
          krStartAt: '2024-01-05T00:00:00',
          krExpireAt: '2024-01-30T00:00:00',
          keyResultId: 11,
          krIdx: 2,
          krTarget: 15,
          krMetric: '회',
          taskList: [
            {
              taskTitle: '매주 월, 금요일에 운동하기',
              taskIdx: 0,
            },
            {
              taskTitle: '다양한 운동 종목 도전하기',
              taskIdx: 1,
            },
            {
              taskTitle: '운동 스케줄을 친구와 공유하고 격려하기',
              taskIdx: 2,
            },
          ],
        },
      ],
    },
  },
];
