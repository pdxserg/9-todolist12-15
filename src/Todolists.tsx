// @flow
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store";
import {
	addTodolistAC,
	changeTodolistFilter, changeTodolistTitleAC,
	FilterValuesType,
	removeTodolistAC,
	TodolistType
} from "./model/todolists-reducer";
import {addTaskAC, changeStatusTaskAC, removeTaskAC, TasksStateType, updateTaskAC} from "./model/tasks-reducer";
import {ThemeMode} from "./model/theme-reducer";
import {getTheme} from "./common/theme/theme";

type Props = {

};
export const Todolists = (props: Props) => {
	const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
	const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)


	const dispatch = useDispatch()


	const removeTask = (taskId: string, todolistId: string) => {

		dispatch(removeTaskAC({taskId, todolistId}))
	}

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC({title, todolistId}))
	}

	const changeTaskStatus = (taskId: string, status: boolean, todolistId: string) => {
		dispatch(changeStatusTaskAC({taskId, todolistId, status}))
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {

		dispatch(changeTodolistFilter(todolistId, filter))
	}

	const removeTodolist = (todolistId: string) => {

		dispatch(removeTodolistAC(todolistId))
		dispatch(removeTodolistAC(todolistId))
	}



	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatch(updateTaskAC({taskId, todolistId, title}))
	}

	const updateTodolist = (todolistId: string, title: string) => {
		dispatch(changeTodolistTitleAC(todolistId, title))
	}

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

								todolistId={tl.id}
								title={tl.title}
								tasks={tasksForTodolist}
								removeTask={removeTask}
								changeFilter={changeFilter}
								addTask={addTask}
								changeTaskStatus={changeTaskStatus}
								filter={tl.filter}
								removeTodolist={removeTodolist}
								updateTask={updateTask}
								updateTodolist={updateTodolist}
							/>
						</Paper>
					</Grid>
				)
			})}
		</div>
	);
};