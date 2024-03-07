import { css } from '@emotion/react';
import styled from '@emotion/styled';

import imgEonseok from '../../assets/teamMoonshot/imgEonseok.png';
import imgHyeonjin from '../../assets/teamMoonshot/imgHyeonjin.png';
import imgJihyeon from '../../assets/teamMoonshot/imgJihyeon.png';
import imgJunmin from '../../assets/teamMoonshot/imgJunmin.png';
import imgKyungmin from '../../assets/teamMoonshot/imgKyungmin.png';
import imgMihyeon from '../../assets/teamMoonshot/imgMihyeon.png';
import imgMincheol from '../../assets/teamMoonshot/imgMincheol.png';
import imgMinjeong from '../../assets/teamMoonshot/imgMinjeong.png';
import imgSooyeon from '../../assets/teamMoonshot/imgSooyeon.png';
import imgTemMoonshotFooterLogo from '../../assets/teamMoonshot/imgTemMoonshotFooterLogo.png';
import imgYeonseo from '../../assets/teamMoonshot/imgYeonseo.png';
import imgYounglyn from '../../assets/teamMoonshot/imgYounglyn.png';
import Profile from './Profile';

const TeamMoonshot = () => {
  return (
    <>
      <section css={section}>
        <div css={imgWrapper}>
          <div css={textContainer}>
            <MainTitle>우리가 달로 향하는 방법</MainTitle>
            <SubTitle>일상의 혁신을 만들어가는 TEAM moonshot</SubTitle>
          </div>
          <Profile src={imgMinjeong} crewName="MinJeong.K" crewRole="Team Leader" />
          <Profile src={imgKyungmin} crewName="KyungMin.Y" crewRole="Product Manager" />
          <Profile src={imgJihyeon} crewName="JiHyeon.L" crewRole="Product Designer" />
          <Profile src={imgMihyeon} crewName="MiHyeon.J" crewRole="Product Designer" />
          <Profile src={imgHyeonjin} crewName="HyeonJin.P" crewRole="Product Designer" />
          <Profile src={imgYeonseo} crewName="YeonSeo.J" crewRole="Web Front-End Developer" />
          <Profile src={imgEonseok} crewName="EonSeok.J" crewRole="Web Front-End Developer" />
          <Profile src={imgSooyeon} crewName="SooYeon.S" crewRole="Web Front-End Developer" />
          <Profile src={imgJunmin} crewName="JunMin.C" crewRole="Web Front-End Developer" />
          <Profile src={imgYounglyn} crewName="YoungLyn.C" crewRole="Back-End Developer" />
          <Profile src={imgMincheol} crewName="MinCheol.S" crewRole="Back-End Developer" />
        </div>
      </section>
      <footer css={footer}>
        <img
          src={imgTemMoonshotFooterLogo}
          alt="team-moonshot-footer-logo"
          width={82.5}
          height={18.75}
        />
        <span>Copyright 2024. TEAM moonshot All rights reserved.</span>
      </footer>
    </>
  );
};

export default TeamMoonshot;

const section = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96.8rem;
  height: 47.2rem;

  /*            전체 - 헤더 - 푸터 높이 */
  height: calc(100vh - 7.6rem - 13.2rem);
  margin: 0 auto;
`;

const imgWrapper = css`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3.2rem 3.5rem;
  width: 96.8rem;
  height: 46.7rem;
`;

const textContainer = css`
  width: 13.5rem;
  height: 22rem;
`;

const footer = css`
  display: flex;
  gap: 3.2rem;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 13.2rem;
`;

const MainTitle = styled.h1`
  margin-bottom: 2rem;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 2.8rem;
  color: ${({ theme }) => theme.colors.gray_000};
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.gray_250};
`;
