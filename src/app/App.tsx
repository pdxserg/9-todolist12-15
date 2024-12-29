import './App.css';
import React from "react";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

import {Header} from "../common/components/Header";
import {getTheme} from '../common/theme/theme';
 import {Main} from "./Main";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectThemeMode} from "./appSelectors";




function App() {
	const themeMode = useAppSelector(selectThemeMode)

	const theme = getTheme(themeMode)


	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Header/>
			<Main/>
		</ThemeProvider>
	);
}

export default App;
