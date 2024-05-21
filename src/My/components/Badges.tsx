import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ITEM_LIST } from '../constants/ITEM_LIST';

interface IAcquiredItemList {
  src: string;
  title: string;
  subTitle: string;
}

const Badges = () => {
  return (
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
  );
};

export default Badges;

const pageCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 6.1rem 8.4rem;
  margin: 0 auto;
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
