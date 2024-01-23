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
      <StSubTitle subTitleColor={subTitleColor}>{subTitle}</StSubTitle>
      <StTitle>{title}</StTitle>
      <StDescription>{description}</StDescription>
    </div>
  );
};

export default TextField;

const textContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StSubTitle = styled.p<{ subTitleColor: keyof ColorsTypes }>`
  margin-bottom: 4rem;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.387rem;
  color: ${({ theme, subTitleColor }) => theme.colors[subTitleColor]};
`;

const StTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 4rem;
  font-weight: 600;
  line-height: 5rem;
  color: ${({ theme }) => theme.colors.gray_100};
  text-align: center;
  white-space: pre-line;
`;

const StDescription = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.colors.gray_200};
`;
