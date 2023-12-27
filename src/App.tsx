import GlobalStyles from "./common/styles/GlobalStyles"
import { ThemeProvider } from "@emotion/react"
import {theme} from "./common/styles/theme"
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      Go MoonShot!
    </ThemeProvider>
  )
}

export default App