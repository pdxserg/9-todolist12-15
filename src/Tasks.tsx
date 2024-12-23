// @flow
import * as React from 'react';
import List from "@mui/material/List";
import {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./common/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	changeStatusTaskAC,
	removeTaskAC,
	TasksStateType,
	updateTaskAC
} from "./model/tasks-reducer";
import {useDispatch, useSelector} from 'react-redux';
import {TodolistType} from "./model/todolists-reducer";
import {RootStateType} from "./store";

type Props ={
	todo:TodolistType,
};
export const Tasks = ({ todo}: Props) => {
	const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)
	const dispatch = useDispatch()

	const removeTask = (taskId: string, todolistId: string) => {
		dispatch(removeTaskAC({taskId, todolistId}))
	}
	const changeTaskStatus = (taskId: string, status: boolean, todolistId: string) => {
		dispatch(changeStatusTaskAC({taskId, todolistId, status}))
	}
	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatch(updateTaskAC({taskId, todolistId, title}))
	}
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

							const removeTaskHandler = () => {
								removeTask(task.id, todo.id)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todo.id)
							}

							const changeTaskTitleHandler = (title: string) => {
								updateTask(todo.id, task.id, title)
							}
							return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
								<div>
									<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
									<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
								</div>
								<IconButton onClick={removeTaskHandler}>
									<DeleteIcon/>
								</IconButton>
							</ListItem>
						})}
					</List>
			}

		</>
	);
};