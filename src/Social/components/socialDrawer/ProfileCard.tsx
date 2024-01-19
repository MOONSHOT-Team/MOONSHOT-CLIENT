import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getCategoryColor } from '@utils/getCategoryColor';
import { useState } from 'react';

import { IcEllipse } from '../../../MainDashBoard/assets/icons';
import { IcLike, IcLikeFill } from '../../assets/icons';

interface IProfileCardProps {
  category: string;
  userName: string;
  userImg: string;
  like: number;
  userIntro: string;
  onClickCard: (idx: number) => void;
  currentUserIdx: number;
  idx: number;
}

const ProfileCard = ({
  category,
  userName,
  userImg,
  like,
  userIntro,
  idx,
  onClickCard,
  currentUserIdx,
}: IProfileCardProps) => {
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState(like);

  /*좋아요 눌렀을 때 핸들러 함수입니다 */
  const handleLike = (event: React.MouseEvent) => {
    isLike ? setLikeCnt(likeCnt - 1) : setLikeCnt(likeCnt + 1);
    setIsLike(!isLike);
    event.stopPropagation();
  };

  return (
    <StProfileCardContainer isCurrent={currentUserIdx === idx} onClick={() => onClickCard?.(idx)}>
      <article css={profileCardStyle}>
        <div css={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem', alignItems: 'center' }}>
          <StyledIcEllipse color={getCategoryColor(category)} />
          <StCategory>{category}</StCategory>
        </div>
        <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Img src={userImg} alt={`${userName}프로필사진`} isCurrent={currentUserIdx === idx} />
          <StUserName>{userName}</StUserName>
          <div css={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
            <i>{isLike ? <IcLikeFill onClick={handleLike} /> : <IcLike onClick={handleLike} />}</i>
            <StLikeCnt>{likeCnt}</StLikeCnt>
          </div>
        </div>
        <StUserIntro>{userIntro}</StUserIntro>
      </article>
    </StProfileCardContainer>
  );
};

export default ProfileCard;

const StProfileCardContainer = styled.li<{ isCurrent: boolean }>`
  flex-shrink: 0;
  width: 18.8rem;
  padding: 1.4rem 1.6rem 1.8rem;
  cursor: pointer;
  background-color: ${({ theme, isCurrent }) =>
    isCurrent ? theme.colors.gray_500 : theme.colors.gray_550};
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_500};
  }
`;

const profileCardStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StCategory = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.caption_10_medium};
`;

const Img = styled.img<{ isCurrent: boolean }>`
  width: 4rem;
  height: 4rem;
  background-color: '#ccc';
  border: ${({ theme, isCurrent }) => (isCurrent ? `1px solid ${theme.colors.gray_200}` : 'none')};
  border-radius: 40px;
`;

const StUserName = styled.p`
  margin-top: 1rem;
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const StLikeCnt = styled.p`
  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts.caption_10_medium};
`;

const StUserIntro = styled.p`
  width: 15.6rem;
  margin-top: 0.9rem;
  color: ${({ theme }) => theme.colors.gray_250};
  text-align: center;
  word-break: keep-all;
  word-wrap: break-word;

  ${({ theme }) => theme.fonts.body_10_regular};
`;

const StyledIcEllipse = styled(IcEllipse)<{ color?: string }>`
  & > circle {
    fill: ${({ color }) => color};
  }
`;
