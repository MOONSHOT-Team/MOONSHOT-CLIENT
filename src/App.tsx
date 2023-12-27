import GlobalStyles from "./common/styles/GlobalStyles"
import { ThemeProvider } from "@emotion/react"
import {theme,ThemeType} from "./common/styles/theme"
const App = () => {
  return (
    <ThemeProvider theme={theme as ThemeType}>
      <GlobalStyles />
      Go MoonShot!
    </ThemeProvider>
  )
}

export default App