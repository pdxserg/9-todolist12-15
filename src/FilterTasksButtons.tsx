// @flow
import * as React from 'react';
import Button from "@mui/material/Button";
import {changeTodolistFilter, FilterValuesType, TodolistType} from "./model/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store";

type PropsType={
	filter: FilterValuesType
	todolistId: string
}
export const FilterTasksButtons = (props: PropsType) => {
	const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
	const{filter}=todolists
	const dispatch = useDispatch()

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		dispatch(changeTodolistFilter(props.todolistId, filter))
	}

	return (
		<>
		<Button
			variant={props.filter === 'all' ? 'outlined' : 'text'}
			color={'inherit'}
			onClick={() => changeFilterTasksHandler('all')}>
			All
		</Button>
		<Button
			variant={props.filter === 'active' ? 'outlined' : 'text'}
			color={'primary'}
			onClick={() => changeFilterTasksHandler('active')}>
			Active
		</Button>
		<Button
			variant={props.filter === 'completed' ? 'outlined' : 'text'}
			color={'secondary'}
			onClick={() => changeFilterTasksHandler('completed')}>
			Completed
		</Button>

		</>
	);
};