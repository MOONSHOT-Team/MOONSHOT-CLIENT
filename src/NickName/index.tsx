import imgWordmarkWhite from '@assets/images/imgWordmarkWhite.png';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

const Nickname = () => {
  const [nickname, setNickname] = useState('');

  const handleEnteredNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣]/g, ''));
  };

  return (
    <section css={nicknameSection}>
      <h1 css={wordMark}>
        <img src={imgWordmarkWhite} alt="work" width={257} height={68} />
      </h1>
      <StDescriptionText>문샷에서 사용할 닉네임을 설정해 주세요.</StDescriptionText>
      <StNicknameInput
        type="text"
        placeholder="닉네임 (특수기호, 공백 제외 7자리 이내)"
        maxLength={7}
        value={nickname}
        onChange={handleEnteredNickname}
      />
      <StStartButton>서비스 시작하기</StStartButton>
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

const StStartButton = styled.button`
  ${({ theme }) => theme.fonts.btn_14_semibold};

  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.main_darkpurple};
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
