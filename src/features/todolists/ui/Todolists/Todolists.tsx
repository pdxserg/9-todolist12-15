// @flow
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import { useSelector} from "react-redux";
import {RootStateType} from "../../../../app/store";
import { TodolistType} from "../../model/todolists-reducer";
import {TasksStateType} from "../../model/tasks-reducer";

export const Todolists = () => {
	const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
	const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)

	return (
		<div>
			{todolists.map((tl) => {

				return (
					<Grid key={tl.id}>
						<Paper sx={{p: '0 20px 20px 20px'}}>
							<Todolist todo={tl}/>
						</Paper>
					</Grid>
				)
			})}
		</div>
	);
};