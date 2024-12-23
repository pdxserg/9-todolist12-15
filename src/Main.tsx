// @flow
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "./AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import Container from "@mui/material/Container";
import {getTheme} from "./common/theme/theme";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeStatusTaskAC, removeTaskAC, TasksStateType, updateTaskAC} from "./model/tasks-reducer";
import {
	addTodolistAC,
	changeTodolistFilter, changeTodolistTitleAC,
	FilterValuesType,
	removeTodolistAC,
	TodolistType
} from "./model/todolists-reducer";
import {RootStateType} from "./store";
import {ThemeMode} from "./model/theme-reducer";
import {Todolists} from "./Todolists";

type Props = {

};
export const Main = (props: Props) => {
	const dispatch = useDispatch()
	const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title))
	}

	return (
		<Container fixed>
			<Grid container sx={{mb: '30px'}}>
				<AddItemForm addItem={addTodolist}/>
			</Grid>

			<Grid container spacing={4}>
				<Todolists/>
			</Grid>
		</Container>
	);
};