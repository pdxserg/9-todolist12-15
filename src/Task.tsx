// @flow 
import * as React from 'react';
import {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./common/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistType} from "./model/todolists-reducer";
import {useDispatch} from "react-redux";
import {changeStatusTaskAC, removeTaskAC, TaskType, updateTaskAC} from "./model/tasks-reducer";

type Props = {
	todo:TodolistType,
	tasksForTodolist:TaskType[]
};
export const Task = ({tasksForTodolist,todo }: Props) => {

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
	return (
		<div>
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
		</div>
	);
};