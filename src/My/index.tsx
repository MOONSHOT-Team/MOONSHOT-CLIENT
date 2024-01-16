import { css } from '@emotion/react';
import styled from '@emotion/styled';

import profileImg from './assets/images/profileImg.png';
import { ITEM_LIST } from './constants/itemList';

interface IAcquiredItemListProps {
  src: string;
  title: string;
  subTitle: string;
}

const My = () => {
  return (
    <section css={myPageUi}>
      <StUserInfoContainer>
        <StUserProfileImg src={profileImg} alt="사용자 사진" />
        <StUserNickName>닉네임</StUserNickName>
        <StUserIdentification>카카오 로그인 유저입니다.</StUserIdentification>
      </StUserInfoContainer>
      <StAcquiredItemContainer>
        <StAcquiredItemsText>획득한 아이템</StAcquiredItemsText>
        <StAcquiredItemImgWrapper>
          {ITEM_LIST.map(({ src, title, subTitle }: IAcquiredItemListProps) => (
            <StAcquiredItemList key={title}>
              <StAcquiredItemImg src={src} alt="획득한 아이템 사진" />
              <StAcquiredItemTitle>
                <StAcquiredItemMainTitle>{title}</StAcquiredItemMainTitle>
                <StAcquiredItemSubTitle>{subTitle}</StAcquiredItemSubTitle>
              </StAcquiredItemTitle>
            </StAcquiredItemList>
          ))}
        </StAcquiredItemImgWrapper>
      </StAcquiredItemContainer>
    </section>
  );
};

export default My;

const myPageUi = css`
  display: flex;
  height: 100%;
  border: 1px solid red;
`;

const StUserInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  width: 34rem;
  padding-top: 13rem;
  background-color: ${({ theme }) => theme.colors.gray_650};
`;

const StUserProfileImg = styled.img`
  display: inline-flex;
  width: 12rem;
  height: 12rem;
`;

const StUserNickName = styled.p`
  margin: 3rem 0 0.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_20_semibold};
`;

const StUserIdentification = styled.p`
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_13_medium};
`;
const StAcquiredItemContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 6.1rem 8.4rem;
`;

const StAcquiredItemsText = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_16_semibold};
`;

const StAcquiredItemImgWrapper = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem 2.4rem;
  width: 80.8rem;
  height: 49.6rem;
`;

const StAcquiredItemList = styled.div`
  position: relative;
  width: 18.4rem;
  height: 24rem;
`;

const StAcquiredItemImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StAcquiredItemTitle = styled.caption`
  position: absolute;
  bottom: 2.8rem;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
`;

const StAcquiredItemMainTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_100};
  ${({ theme }) => theme.fonts.btn_14_semibold};
`;

const StAcquiredItemSubTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
