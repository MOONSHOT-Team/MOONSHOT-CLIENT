import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ColorsTypes } from '@styles/theme';

interface ITextFieldProps {
  subTitle: string;
  subTitleColor: keyof ColorsTypes;
  title: string;
  description: string;
}

const TextField = ({ subTitle, subTitleColor, title, description }: ITextFieldProps) => {
  return (
    <div css={textContainer}>
      <SubTitle subTitleColor={subTitleColor}>{subTitle}</SubTitle>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </div>
  );
};

export default TextField;

const textContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rem;
`;

const SubTitle = styled.p<{ subTitleColor: keyof ColorsTypes }>`
  margin-bottom: 4rem;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.387rem;
  color: ${({ theme, subTitleColor }) => theme.colors[subTitleColor]};
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  font-size: 4rem;
  font-weight: 600;
  line-height: 5rem;
  color: ${({ theme }) => theme.colors.gray_100};
`;

const Description = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.colors.gray_200};
`;
