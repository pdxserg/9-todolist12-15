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
// let todolistID1 = v1()
// let todolistID2 = v1()
//
// let [todolists, dispatchTodolists] = useReducer (todolistsReducer,[
// 	{id: todolistID1, title: 'What to learn', filter: 'all'},
// 	{id: todolistID2, title: 'What to buy', filter: 'all'},
// ])
//
// let [tasks, dispatchTasks] = useReducer(tasksReducer,{
// 	[todolistID1]: [
// 		{id: v1(), title: 'HTML&CSS', isDone: true},
// 		{id: v1(), title: 'JS', isDone: true},
// 		{id: v1(), title: 'ReactJS', isDone: false},
// 	],
// 	[todolistID2]: [
// 		{id: v1(), title: 'Rest API', isDone: true},
// 		{id: v1(), title: 'GraphQL', isDone: false},
// 	],
// })