import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { MOCK_SOCIAL_DATA } from '../../constants/MOCK_SOCIAL_DATA';
import ProfileCard from './ProfileCard';

const SocialDrawer = ({ onHandleCurrentIdx }: { onHandleCurrentIdx: (idx: number) => void }) => {
  const [currentUserIdx, setCurrentUserIdx] = useState(0);

  const handleClickCard = (idx: number) => {
    setCurrentUserIdx(idx);
    onHandleCurrentIdx(idx);
  };
  return (
    <StContainer>
      <div css={{ padding: '2.6rem 1rem 0 2.2rem' }}>
        <StDrawerHeader>공유 리스트</StDrawerHeader>
        <ul css={profileContainer}>
          {MOCK_SOCIAL_DATA.map((data, idx) => (
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
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.gray_600};

  &::-webkit-scrollbar {
    width: 1.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray_500};
    background-clip: padding-box;
    border: 4px solid transparent;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    background-size: cover;
  }
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
