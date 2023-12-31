import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from './common/styles/globalStyles';
import { theme } from './common/styles/theme';
import { IcArrow } from '@assets/icons';

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Global styles={globalStyles} />
			<IcArrow />
			Go MoonShot!
		</ThemeProvider>
	);
};

export default App;
