import instance from '@apis/instance';
import Loading from '@components/Loading';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { getUserInfo } from './apis/fetcher';
import profileImg from './assets/images/profileImg.png';
import { ITEM_LIST } from './constants/itemList';

interface IAcquiredItemList {
  src: string;
  title: string;
  subTitle: string;
}

const My = () => {
  const navigate = useNavigate();

  const handleWithdrawal = async () => {
    await instance.delete('/v1/user/withdrawal');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');

    navigate('/');
  };

  const { data: userInfo, isLoading } = useSWR('/v1/user/mypage', getUserInfo);

  if (isLoading) return <Loading />;

  return (
    <section css={myPageUi}>
      <StUserInfoContainer>
        <StUserProfileImg
          src={userInfo?.data.data.profileImgUrl ? userInfo?.data.data.profileImgUrl : profileImg}
          alt="사용자 사진"
        />
        <StUserNickName>{userInfo?.data.data.nickname}</StUserNickName>
        <StUserIdentification>
          {userInfo?.data.data.socialPlatform === 'kakao' ? '카카오' : '구글'} 로그인 유저입니다.
        </StUserIdentification>
        <StWithdrawalButton onClick={handleWithdrawal}>회원탈퇴</StWithdrawalButton>
      </StUserInfoContainer>
      <section css={pageCenter}>
        <div>
          <StAcquiredItemsText>획득한 아이템</StAcquiredItemsText>
          <StAcquiredItemImgWrapper>
            {ITEM_LIST.map(({ src, title, subTitle }: IAcquiredItemList) => (
              <StAcquiredItemList key={title}>
                <img src={src} alt="획득한 아이템 사진" width={184} height={240} />
                <StAcquiredItemTitle>
                  <StAcquiredItemMainTitle>{title}</StAcquiredItemMainTitle>
                  <StAcquiredItemSubTitle>{subTitle}</StAcquiredItemSubTitle>
                </StAcquiredItemTitle>
              </StAcquiredItemList>
            ))}
          </StAcquiredItemImgWrapper>
        </div>
      </section>
    </section>
  );
};

export default My;

const pageCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 6.1rem 8.4rem;
  margin: 0 auto;
`;

const myPageUi = css`
  display: flex;
  height: 100%;
`;

const StUserInfoContainer = styled.section`
  position: relative;
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
  border: 2px solid ${({ theme }) => theme.colors.gray_400};
  border-radius: 60px;
  object-fit: cover;
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

const StWithdrawalButton = styled.button`
  position: absolute;
  right: 4rem;
  bottom: 4rem;
  width: 4.5rem;
  height: 2rem;
  ${({ theme }) => theme.fonts.body_13_medium};

  color: ${({ theme }) => theme.colors.gray_450};
  border-bottom: 1px solid currentcolor;
`;

const StAcquiredItemsText = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_16_semibold};
`;

const StAcquiredItemImgWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem 2.4rem;
  width: 80.8rem;
  height: 49.6rem;
`;

const StAcquiredItemList = styled.div`
  position: relative;
`;

const StAcquiredItemTitle = styled.div`
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
