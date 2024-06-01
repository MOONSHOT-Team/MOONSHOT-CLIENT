import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { ISocialDataType } from '../../types/socialDataType';
import ProfileCard from './ProfileCard';

interface ISocialDrawerProsp {
  socialData: ISocialDataType[];
  onHandleCurrentIdx: (idx: number) => void;
}

const SocialDrawer = ({ socialData, onHandleCurrentIdx }: ISocialDrawerProsp) => {
  const [currentUserIdx, setCurrentUserIdx] = useState(0);

  const handleClickCard = (idx: number) => {
    setCurrentUserIdx(idx);
    onHandleCurrentIdx(idx);
  };
  return (
    <StContainer>
      <div css={{ padding: '2.6rem 2.2rem 0' }}>
        <StDrawerHeader>공유 리스트</StDrawerHeader>
        <ul css={profileContainer}>
          {socialData.map((data, idx) => (
            <ProfileCard
              key={data.userName + idx}
              {...data}
              idx={idx}
              currentUserIdx={currentUserIdx}
              onClickCard={handleClickCard}
            />
          ))}
        </ul>
      </div>
    </StContainer>
  );
};

export default SocialDrawer;

const StContainer = styled.aside`
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  min-width: 23.2rem;
  height: 100%;
  overflow-y: auto;

  /* 전역에 스크롤 숨기는 기능 생기면 scroll로 수정 */
  background-color: ${({ theme }) => theme.colors.gray_600};
`;

const StDrawerHeader = styled.div`
  width: 100%;
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const profileContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  height: 100%;
  margin-bottom: 5rem;
`;
