import instance from '@apis/instance';
import imgWordmarkWhite from '@assets/images/imgWordmarkWhite.png';
import webpWordmarkWhite from '@assets/images/webpWordmarkWhite.webp';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { getUserInfo } from './apis/fetcher';

const Nickname = () => {
  const [nickname, setNickname] = useState('');
  const { data } = useSWR('/v1/user/mypage', getUserInfo);
  const navigate = useNavigate();

  if (data?.data.data.nickname) navigate('/dashboard');

  const handleEnteredNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await instance.patch('v1/user/profile', {
      nickname,
    });

    navigate('/dashboard');
  };

  return (
    <section css={nicknameSection}>
      <h1 css={wordMark}>
        <picture>
          <source srcSet={webpWordmarkWhite} type="image/webp" />
          <img src={imgWordmarkWhite} alt="work" width={257} height={68} />
        </picture>
      </h1>
      <form css={formStyle} onSubmit={handleSubmit}>
        <StDescriptionText>문샷에서 사용할 닉네임을 설정해 주세요.</StDescriptionText>
        <StNicknameInput
          type="text"
          placeholder="닉네임 (7자리 이내)"
          maxLength={7}
          value={nickname}
          onChange={handleEnteredNickname}
        />
        <StStartButton type="submit" disabled={nickname === ''}>
          서비스 시작하기
        </StStartButton>
      </form>
    </section>
  );
};

export default Nickname;

const nicknameSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const wordMark = css`
  margin-bottom: 4rem;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StStartButton = styled.button<{ disabled: boolean }>`
  ${({ theme }) => theme.fonts.btn_14_semibold};

  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray_500 : theme.colors.main_darkpurple};
  border-radius: 6px;
`;

const StDescriptionText = styled.p`
  ${({ theme }) => theme.fonts.title_16_semibold};

  margin-bottom: 2rem;
`;

const StNicknameInput = styled.input`
  ${({ theme }) => theme.fonts.body_12_medium};

  width: 28rem;
  height: 4rem;
  margin-bottom: 6.8rem;
  color: ${({ theme }) => theme.colors.gray_000};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_450};
  }
`;
