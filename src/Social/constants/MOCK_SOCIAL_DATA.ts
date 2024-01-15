export const MOCK_SOCIAL_DATA = [
  {
    //1
    category: '건강',
    userName: '달나라모험',
    userImg:
      'data:image/png;base64,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',
    like: 132,
    userIntro: 'ESTJ/목표를 성취하는 과정에서 짜릿함을 느껴요',
    okrTreeData: {
      objTitle: '지속가능한 성장을 위해 건강하기',
      objCategory: '건강',
      objContent: '이루지 못하는 목표는 없다.',
      objStartAt: '2024-01-05T00:00:00',
      objExpireAt: '2024-01-30T00:00:00',
      krList: [
        {
          title: '골격근량 25kg 달성하기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          idx: 0,
          target: 25,
          metric: 'kg',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '주 2회 이상 헬스장 가기',
              idx: 0,
            },
            {
              title: '한달에 프로틴 한 통 비우기',
              idx: 1,
            },
            {
              title: '술 마시지 않기',
              idx: 2,
            },
          ],
        },
        {
          title: '체중 3kg 감량하기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          idx: 1,
          target: 3,
          metric: 'kg',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '런닝 모임 참여하기',
              idx: 0,
            },
            {
              title: '닭가슴살 위주로 먹기',
              idx: 1,
            },
            {
              title: '일정한 시간에 식사하기',
              idx: 2,
            },
          ],
        },
        {
          title: '10km 걷기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          order: 2,
          target: 10000,
          metric: '보',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '출퇴근 시 계단으로 오르내리기',
              idx: 0,
            },
            {
              title: '강아지 산책시키기',
              idx: 1,
            },
            {
              title: '점심 시간에 공원 산책하기',
              idx: 2,
            },
          ],
        },
      ],
    },
  },
  //2
  {
    category: '경제',
    userName: '실용주의자',
    userImg: '',
    like: 129,
    userIntro: '웹 개발자/TEAM moonshot에서 일하고 있습니다',
    okrTreeData: {
      objTitle: '전세 자금 마련하기',
      objCategory: '경제',
      objContent: '할 수 있다면 할 수 있다',
      objStartAt: '2024-01-05T00:00:00',
      objExpireAt: '2024-01-30T00:00:00',
      krList: [
        {
          title: '저축 계획 수립하여 50000000원 저축하기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          idx: 0,
          target: 50000000,
          metric: '원',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '주 1회 20만원씩 저축하기', //값 없다면 빈 stirng('') 값으로, 형식은 유지
              idx: 0,
            },
            {
              title: '월별 지출을 기록하기',
              idx: 1,
            },
            {
              title: '급여날마다 지출 계획 세우기',
              idx: 2,
            },
          ],
        },
        {
          title: '부가적인 수입원 발굴을 위해 부업으로 50만원 확보하기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          idx: 1,
          target: 3,
          metric: '만원',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '부업 모델 선정하기',
              idx: 0,
            },
            {
              title: '주 10시간 부업에 투자하기',
              idx: 1,
            },
            {
              title: '부업 시간 계획 세우기',
              idx: 2,
            },
          ],
        },
        {
          title: '지출 100000원 이상 절감하기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          order: 2,
          target: 100000,
          metric: '원',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '불필요한 구독 서비스 줄이기',
              idx: 0,
            },
            {
              title: '절약할 수 있는 대체 방안 찾아보기',
              idx: 1,
            },
            {
              title: '절약을 기록하는 가계부 사용하기',
              idx: 2,
            },
          ],
        },
      ],
    },
  },
  //3
  {
    category: '성장',
    userName: '질문을 던지는 사람',
    userImg: '',
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
          title: '리더십 관련 도서 3권 읽기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          idx: 0,
          target: 3,
          metric: '권',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '매주 한 권의 리더십 관련 도서 읽기', //값 없다면 빈 stirng('') 값으로, 형식은 유지
              idx: 0,
            },
            {
              title: '도서를 읽은 후 요약하기',
              idx: 1,
            },
            {
              title: '리더십 기술 향상을 위한 액션 아이템 리스트 작성하기',
              idx: 2,
            },
          ],
        },
        {
          title: '주변 사람들에게 짧은 발표 5회 연습하기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          idx: 1,
          target: 5,
          metric: '회',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '매주 3분 내외의 발표 진행하기',
              idx: 0,
            },
            {
              title: '발표 기술 향상을 위한 개선점 파악하기',
              idx: 1,
            },
            {
              title: '발표 기회를 찾아 참여하기',
              idx: 2,
            },
          ],
        },
        {
          title: '리더 역할 2회 이상 맡기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          order: 2,
          target: 2,
          metric: '',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '팀 내에서 프로젝트 리더로 선정되도록 노력하기',
              idx: 0,
            },
            {
              title: '프로젝트 일정 관리 효율적으로 수행하기',
              idx: 1,
            },
            {
              title: '팀 내 소통을 위해 빠르게 연락 확인하기',
              idx: 2,
            },
          ],
        },
      ],
    },
  },
  //4
  {
    category: '라이프스타일',
    userName: '김문샷정',
    userImg: '',
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
          title: '균형 잡힌 식사 10회 이상 섭취',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          idx: 0,
          target: 10,
          metric: '회',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '하루 1끼 식사를 균형 있게 섭취하기',
              idx: 0,
            },
            {
              title: '불필요한 과자류나 당류 섭취 줄이기',
              idx: 1,
            },
            {
              title: '식습관을 추적하고 기록하는 앱 사용하기',
              idx: 2,
            },
          ],
        },
        {
          title: '명상 또는 마음을 진정시키는 시간 10시간 이상 확보하기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          idx: 1,
          target: 10,
          metric: '시간',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '하루에 30분 이상 산책하기',
              idx: 0,
            },
            {
              title: '명상 가이드로 스트레스 완화 방법 습득하기',
              idx: 1,
            },
            {
              title: '스트레스를 유발하는 요소 최소화하기',
              idx: 2,
            },
          ],
        },
        {
          title: '운동 15회 이상 하기',
          startAt: '2024-01-05T00:00:00',
          expireAt: '2024-01-30T00:00:00',
          order: 2,
          target: 15,
          metric: '회',
          descriptionBefore: '목표',
          descriptionAfter: '달성',
          taskList: [
            {
              title: '매주 월, 금요일에 운동하기',
              idx: 0,
            },
            {
              title: '다양한 운동 종목 도전하기',
              idx: 1,
            },
            {
              title: '운동 스케줄을 친구와 공유하고 격려하기',
              idx: 2,
            },
          ],
        },
      ],
    },
  },
];
