import styled from '@emotion/styled';
const SocialDrawer = () => {
  return <StContainer>SocialDrawer</StContainer>;
};

export default SocialDrawer;
const StContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 23.2rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray_600};
`;
