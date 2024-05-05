import instance from '@apis/instance';
import Loading from '@components/Loading';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { getUserInfo } from '../apis/fetcher';
import profileImg from '../assets/images/profileImg.png';

const UserInfo = () => {
  const { data: userInfo, isLoading } = useSWR('/v1/user/mypage', getUserInfo);
  const navigate = useNavigate();

  const handleWithdrawal = async () => {
    await instance.delete('/v1/user/withdrawal');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');

    navigate('/sign-in');
  };

  if (isLoading) return <Loading />;

  return (
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
  );
};

export default UserInfo;

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
