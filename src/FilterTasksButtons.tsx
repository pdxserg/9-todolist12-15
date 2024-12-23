// @flow
import * as React from 'react';
import Button from "@mui/material/Button";
import {changeTodolistFilter, FilterValuesType, TodolistType} from "./model/todolists-reducer";
import {useDispatch} from "react-redux";
import {filterButtonsContainerSx} from "./Todolist.styles";
import Box from "@mui/material/Box";

type PropsType = {
	todo: TodolistType
}
export const FilterTasksButtons = ({todo}: PropsType) => {
	const dispatch = useDispatch()

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		dispatch(changeTodolistFilter(todo.id, filter))
	}

	return (
		<Box sx={filterButtonsContainerSx}>
			<Button
				variant={todo.filter === 'all' ? 'outlined' : 'text'}
				color={'inherit'}
				onClick={() => changeFilterTasksHandler('all')}>
				All
			</Button>
			<Button
				variant={todo.filter === 'active' ? 'outlined' : 'text'}
				color={'primary'}
				onClick={() => changeFilterTasksHandler('active')}>
				Active
			</Button>
			<Button
				variant={todo.filter === 'completed' ? 'outlined' : 'text'}
				color={'secondary'}
				onClick={() => changeFilterTasksHandler('completed')}>
				Completed
			</Button>
		</Box>

	);
};