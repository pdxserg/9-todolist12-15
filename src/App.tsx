import './App.css';
import {Todolist} from "./Todolist";
import React from "react";
import {AddItemForm} from "./AddItemForm";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {addTaskAC, changeStatusTaskAC, removeTaskAC, updateTaskAC} from "./model/tasks-reducer";
import {addTodolistAC, changeTodolistFilter, changeTodolistTitleAC, removeTodolistAC} from "./model/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store";
import {Header} from "./Header";
import { getTheme } from './common/theme/theme';
import {ThemeMode} from "./model/theme-reducer";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}


function App() {

	const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
	const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)
	const themeMode = useSelector<RootStateType,ThemeMode>(state => state.themeMode.themeMode)

	const theme = getTheme(themeMode)
	const dispatch = useDispatch()


	const removeTask = (taskId: string, todolistId: string) => {

		dispatch(removeTaskAC({taskId, todolistId}))
	}

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC({title, todolistId}))
	}

	const changeTaskStatus = (taskId: string, status: boolean, todolistId: string) => {
		dispatch(changeStatusTaskAC({taskId, todolistId, status}))
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {

		dispatch(changeTodolistFilter(todolistId, filter))
	}

	const removeTodolist = (todolistId: string) => {

		dispatch(removeTodolistAC(todolistId))
		dispatch(removeTodolistAC(todolistId))
	}

	const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title))
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatch(updateTaskAC({taskId, todolistId, title}))
	}

	const updateTodolist = (todolistId: string, title: string) => {
		dispatch(changeTodolistTitleAC(todolistId, title))
	}


	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Header/>
			<Container fixed>
				<Grid container sx={{mb: '30px'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>

				<Grid container spacing={4}>
					{todolists.map((tl) => {

						const allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
						}

						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
						}

						return (
							<Grid key={tl.id}>
								<Paper sx={{p: '0 20px 20px 20px'}}>
									<Todolist

										todolistId={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										updateTask={updateTask}
										updateTodolist={updateTodolist}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
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