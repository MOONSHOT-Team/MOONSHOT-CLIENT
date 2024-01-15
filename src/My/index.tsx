import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { profileImg } from './assets/images/images';
import { ITEMLIST } from './constants/itemList';

interface IItemListProps {
  src: string;
  title: string;
  subTitle: string;
}

const My = () => {
  return (
    <div css={myPageUi}>
      <StUserSection>
        <StUserImg src={profileImg}></StUserImg>
        <StNickName>닉네임</StNickName>
        <StUseridentify>카카오 로그인 유저입니다.</StUseridentify>
      </StUserSection>
      <StItemSection>
        <StAcquiredItems>획득한 아이템</StAcquiredItems>
        <StItemImgWrapper>
          {ITEMLIST.map(({ src, title, subTitle }: IItemListProps) => (
            <StItemList key={title}>
              <StItemImg src={src} />
              <StItemTitle>{title}</StItemTitle>
              <StItemSubTitle>{subTitle}</StItemSubTitle>
            </StItemList>
          ))}
        </StItemImgWrapper>
      </StItemSection>
    </div>
  );
};

export default My;

const myPageUi = css`
  display: flex;
`;

const StUserSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34rem;
  padding-top: 13rem;
  background-color: ${({ theme }) => theme.colors.gray_650};
`;

const StUserImg = styled.img`
  display: inline-flex;
  width: 12rem;
  height: 12rem;
`;
const StItemSection = styled.section`
  padding: 6.1rem 13.4rem 9rem 8.4rem;
`;

const StNickName = styled.p`
  display: flex;
  gap: 0.6rem;
  margin: 3rem 0 0.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_20_semibold};
`;

const StUseridentify = styled.p`
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_13_medium};
`;

const StAcquiredItems = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_16_semibold};
`;

const StItemImgWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem 2.4rem;
  width: 80.8rem;
  height: 49.6rem;
`;

const StItemList = styled.div`
  position: relative;
  width: 18.4rem;
  height: 24rem;
`;

const StItemImg = styled.img`
  width: 18.4rem;
  height: 24rem;
`;

const StItemTitle = styled.p`
  position: absolute;
  bottom: 5.4rem;
  left: 2.2rem;
  display: flex;
  justify-content: center;
  width: 14rem;
  ${({ theme }) => theme.fonts.btn_14_semibold};

  color: ${({ theme }) => theme.colors.gray_100};
`;
const StItemSubTitle = styled.p`
  position: absolute;
  bottom: 2.8rem;
  left: 5.25rem;
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
