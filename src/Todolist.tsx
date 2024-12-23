
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./common/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {TaskType} from "./model/tasks-reducer";
import {FilterValuesType, TodolistType} from "./model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons";
import {useSelector} from "react-redux";
import {RootStateType} from "./store";


type PropsType = {
	tasks: TaskType[]
	todo:TodolistType,
	removeTask: (taskId: string, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void

	removeTodolist: (todolistId: string) => void
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
	const {
		tasks,
		removeTask,
		addTask,
		changeTaskStatus,
		removeTodolist,
		updateTask,
		updateTodolist,
		todo
	} = props



	const removeTodolistHandler = () => {
		removeTodolist(todo.id)
	}

	const addTaskCallback = (title: string) => {
		addTask(title, todo.id)
	}

	const updateTodolistHandler = (title: string) => {
		updateTodolist(todo.id, title)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3><EditableSpan value={todo.title} onChange={updateTodolistHandler}/></h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon/>
				</IconButton>
			</div>
			<AddItemForm addItem={addTaskCallback}/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {

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
			<Box sx={filterButtonsContainerSx}>
				<FilterTasksButtons todo ={todo}/>
			</Box>
		</div>
	)
}
