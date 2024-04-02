import Header from '@components/Layout/Header';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import imgSymbolBlack from './assets/imgSymbolBlack.png';

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div css={errorContainer}>
        <img
          css={imgBottomMargin}
          src={imgSymbolBlack}
          alt="symbol-black"
          width={123}
          height={147}
        />
        <StErrorTitle>원하시는 페이지를 찾을 수 없습니다</StErrorTitle>
        <StErrorText>
          찾으려는 페이지의 주소가 잘못 입력되었거나,
          <br />
          주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다
          <br />
          입력하신 페이지의 주소가 정확한지 다시 한 번 확인해주세요
        </StErrorText>
        <StBtns>
          <StBackToPrev onClick={() => navigate(-1)}>이전으로 돌아가기</StBackToPrev>
          <StBackToHomeLink to="/">홈페이지 돌아가기</StBackToHomeLink>
        </StBtns>
      </div>
    </>
  );
};

export default Error;

const errorContainer = css`
  margin: 50vh auto 0;
  text-align: center;
  transform: translateY(-50%);
`;

const imgBottomMargin = css`
  margin-bottom: 3.2rem;
`;

const StErrorTitle = styled.h1`
  ${({ theme }) => theme.fonts.title_20_semibold};

  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.gray_000};
`;

const StErrorText = styled.p`
  ${({ theme }) => theme.fonts.body_12_regular};

  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.gray_000};
`;

const StBtns = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const StBackToPrev = styled.button`
  ${({ theme }) => theme.fonts.body_14_semibold};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15.5rem;
  height: 4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.gray_550};
  border-radius: 6px;
`;

const StBackToHomeLink = styled(Link)`
  ${({ theme }) => theme.fonts.body_14_semibold};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15.5rem;
  height: 4rem;
  color: ${({ theme }) => theme.colors.gray_650};
  background-color: ${({ theme }) => theme.colors.gray_000};
  border-radius: 6px;
`;
