import { ThemeProvider } from "@emotion/react"
import GlobalStyles from "./common/styles/GlobalStyles"
import {theme} from "./common/styles/theme"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <p>Go MoonShot!</p>
    </ThemeProvider>
  )
}

export default App