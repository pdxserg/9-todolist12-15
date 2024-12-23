// @flow
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import { useSelector} from "react-redux";
import {RootStateType} from "./store";
import { TodolistType} from "./model/todolists-reducer";
import {TasksStateType} from "./model/tasks-reducer";

export const Todolists = () => {
	const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
	const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)

	return (
		<div>
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
								todo={tl}
								tasks={tasksForTodolist}
							/>
						</Paper>
					</Grid>
				)
			})}
		</div>
	);
};