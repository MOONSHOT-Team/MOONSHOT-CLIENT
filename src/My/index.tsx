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
              <StItemTitle>
                {title} <StItemSubTitle>{subTitle}</StItemSubTitle>
              </StItemTitle>
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
  height: 100%;
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
const StItemSection = styled.section`
  padding: 6.1rem 0 0 8.4rem;
`;

const StAcquiredItems = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_16_semibold};
`;

const StItemImgWrapper = styled.article`
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
  top: 17.2rem;
  left: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
  width: 14rem;

  ${({ theme }) => theme.fonts.btn_14_semibold};

  color: ${({ theme }) => theme.colors.gray_100};
  text-align: center;
`;
const StItemSubTitle = styled.p`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_12_regular};

  text-align: center;
`;
