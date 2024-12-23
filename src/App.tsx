import './App.css';
import React from "react";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {useSelector} from "react-redux";
import {RootStateType} from "./store";
import {Header} from "./Header";
import {getTheme} from './common/theme/theme';
import {ThemeMode} from "./model/theme-reducer";
import {Main} from "./Main";




function App() {
	const themeMode = useSelector<RootStateType, ThemeMode>(state => state.themeMode.themeMode)

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
