import { Global, ThemeProvider } from "@emotion/react";
import globalStyles from "./common/styles/globalStyles";
import { theme } from "./common/styles/theme"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <p>Go MoonShot!</p>
    </ThemeProvider>
  )
}

export default App