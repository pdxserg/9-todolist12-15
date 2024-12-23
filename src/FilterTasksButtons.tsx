// @flow
import * as React from 'react';
import Button from "@mui/material/Button";
import {FilterValuesType} from "./model/todolists-reducer";
import {useDispatch} from "react-redux";

type PropsType={
	filter: FilterValuesType
	todolistId: string
}
export const FilterTasksButtons = (props: PropsType) => {
	const dispatch = useDispatch()

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		dispatch()
		changeFilter(filter, props.todolistId)
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