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
	task:TaskType,
	todo:TodolistType
};
export const Task = ({todo,task }: Props) => {

	const dispatch = useDispatch()

	const removeTask = () => {
		dispatch(removeTaskAC({taskId:task.id, todolistId: todo.id}))
	}
	const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
		const status = e.currentTarget.checked
		dispatch(changeStatusTaskAC({taskId:task.id, todolistId: todo.id, status}))
	}
	const updateTask = ( title: string) => {
		dispatch(updateTaskAC({taskId:task.id, todolistId: todo.id, title}))
	}
	return (

				  <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
					<div>
						<Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
						<EditableSpan value={task.title} onChange={updateTask}/>
					</div>
					<IconButton onClick={removeTask}>
						<DeleteIcon/>
					</IconButton>
				</ListItem>


	);
};