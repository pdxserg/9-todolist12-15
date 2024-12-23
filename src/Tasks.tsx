// @flow
import * as React from 'react';
import List from "@mui/material/List";
"@mui/icons-material/Delete";
import {TasksStateType,} from "./model/tasks-reducer";
import { useSelector} from 'react-redux';
import {TodolistType} from "./model/todolists-reducer";
import {RootStateType} from "./store";
import {Task} from "./Task";

type Props ={
	todo:TodolistType,
};
export const Tasks = ({ todo}: Props) => {
	const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)

	const allTodolistTasks = tasks[todo.id]
	let tasksForTodolist = allTodolistTasks

	if (todo.filter === 'active') {
		tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
	}

	if (todo.filter === 'completed') {
		tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
	}
	return (

		<>
			{
				tasksForTodolist.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasksForTodolist.map((task) => {
							return <Task task={task} todo={todo}/>
						})}
					</List>
			}

		</>
	);
};