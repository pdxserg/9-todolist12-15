// @flow
import * as React from 'react';
import Button from "@mui/material/Button";
import {changeTodolistFilter, FilterValuesType, TodolistType} from "./model/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store";

type PropsType={
	todo:TodolistType
}
export const FilterTasksButtons = (props: PropsType) => {
	const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
	const{filter}=todolists
	const dispatch = useDispatch()

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		dispatch(changeTodolistFilter(props.todo.id, filter))
	}

	return (
		<>
		<Button
			variant={props.todo.filter === 'all' ? 'outlined' : 'text'}
			color={'inherit'}
			onClick={() => changeFilterTasksHandler('all')}>
			All
		</Button>
		<Button
			variant={props.todo.filter === 'active' ? 'outlined' : 'text'}
			color={'primary'}
			onClick={() => changeFilterTasksHandler('active')}>
			Active
		</Button>
		<Button
			variant={props.todo.filter === 'completed' ? 'outlined' : 'text'}
			color={'secondary'}
			onClick={() => changeFilterTasksHandler('completed')}>
			Completed
		</Button>

		</>
	);
};