import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface IProfileProps {
  src: string;
  crewName: string;
  crewRole: string;
}

const Profile = ({ src, crewName, crewRole }: IProfileProps) => {
  return (
    <figure css={figure}>
      <img css={imgMarginBottom} src={src} alt="team-moonshot-profile" width={135} height={180} />
      <StName>{crewName}</StName>
      <StRole>{crewRole}</StRole>
    </figure>
  );
};

export default Profile;

const figure = css`
  width: 13.5rem;
  height: 22rem;
`;

const imgMarginBottom = css`
  margin-bottom: 0.8rem;
`;

const StName = styled.figcaption`
  color: ${({ theme }) => theme.colors.gray_100};

  ${({ theme }) => theme.fonts.btn_14_medium};
`;

const StRole = styled.figcaption`
  color: ${({ theme }) => theme.colors.gray_100};

  ${({ theme }) => theme.fonts.caption_9_regular};
`;
