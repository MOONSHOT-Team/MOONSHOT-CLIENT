import { Global, ThemeProvider } from "@emotion/react";
import globalStyles from "./common/styles/globalStyles";
import { theme } from "./common/styles/theme";
import styled from "@emotion/styled";

const Text = styled.div`
  width: 100%;
  height: 100%;
  border: 1px;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Text>Go MoonShot!</Text>
    </ThemeProvider>
  );
};

export default App;
