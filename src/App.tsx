import GlobalStyles from "./common/styles/GlobalStyles"
import { ThemeProvider } from "@emotion/react"
import {theme} from "./common/styles/theme"
import styled from '@emotion/styled';

const Text = styled.p`
  width: 100%;
  height: 100%;
  border: 1rem;
  font-size: 2rem;
  border-radius: 2rem;

  &:hover {
  width: 1010px;
  }
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Text>Go MoonShot!</Text>
    </ThemeProvider>
  )
}

export default App