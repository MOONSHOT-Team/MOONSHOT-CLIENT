import styled from '@emotion/styled';
const SocialDrawer = () => {
  return (
    <StContainer>
      <div css={{ margin: '2.6rem 1rem 0 2.2rem' }}>
        <StDrawerHeader>공유 리스트</StDrawerHeader>
        <section></section>
      </div>
    </StContainer>
  );
};

export default SocialDrawer;

const StContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 23.2rem;
  height: 100%;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.gray_600};

  &::-webkit-scrollbar {
    width: 1.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray_500};
    background-clip: padding-box;
    border: 4px solid transparent;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    background-size: cover;
  }
`;

const StDrawerHeader = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
