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
import imgYeonseo from '../../assets/teamMoonshot/imgYeonseo.png';
import imgYounglyn from '../../assets/teamMoonshot/imgYounglyn.png';
import Profile from './Profile';

const TeamMoonshot = () => {
  return (
    <section css={section}>
      <div css={textContainer}>
        <MainTitle>우리가 달로 향하는 방법</MainTitle>
        <SubTitle>일상의 혁신을 만들어가는 TEAM moonshot</SubTitle>
      </div>
      <Profile src={imgMinjeong} crewName="MinJeon.K" crewRole="Team Leader" />
      <Profile src={imgKyungmin} crewName="KyungMin.Y" crewRole="Product Manager" />
      <Profile src={imgJihyeon} crewName="JiHyeon.L" crewRole="Product Designer" />
      <Profile src={imgMihyeon} crewName="MiHyeon.J" crewRole="Product Designer" />
      <Profile src={imgHyeonjin} crewName="HyeonJin.P" crewRole="Product Designer" />
      <Profile src={imgYeonseo} crewName="YeonSeo.K" crewRole="Web Front-End Developer" />
      <Profile src={imgEonseok} crewName="EonSeok.J" crewRole="Web Front-End Developer" />
      <Profile src={imgSooyeon} crewName="SooYeon.S" crewRole="Web Front-End Developer" />
      <Profile src={imgJunmin} crewName="JunMin.C" crewRole="Web Front-End Developer" />
      <Profile src={imgYounglyn} crewName="YoungLyn.C" crewRole="Back-End Develop" />
      <Profile src={imgMincheol} crewName="MinCheol.S" crewRole="Back-End Develop" />
    </section>
  );
};

export default TeamMoonshot;

const section = css`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3.2rem 3.5rem;
  width: 96.8rem;
  height: 46.6rem;
  margin: 50vh auto 0;
  transform: translateY(-50%);
`;

const textContainer = css`
  width: 13.5rem;
  height: 22rem;
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
