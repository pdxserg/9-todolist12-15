import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from "../common/components/AddItemForm";
import {EditableSpan} from "../common/components/EditableSpan";
import axios from "axios";
import {headersToken, token} from "./token/token";


type TodolistsType = TodolistType[]
type TodolistType = {
	id: string,
	title: string,
	addedDate: string,
	order: number
}
type PostType={
	data:{
		item:TodolistsType
	},
	resultCode: number,
	messages: [],
	fieldsErrors: [],
}
export const AppHttpRequests = () => {
	const [todolists, setTodolists] = useState<TodolistsType>([])
	const [tasks, setTasks] = useState<any>({})

	useEffect(() => {
		axios.get<TodolistsType>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
			headers: headersToken
		})
			.then(res => {
				console.log(res.data)
				setTodolists(res.data)
			})

	}, [])

	const createTodolistHandler = (title: string) => {
		// create todolist
		axios
			.post<PostType>(
				'https://social-network.samuraijs.com/api/1.1/todo-lists',
				{title}, {headers: headersToken})
			.then(res => {
				console.log(res.data.data.item)
				const newTod = res.data.data.item
				// @ts-ignore
				setTodolists([newTod, ...todolists])

			})
	}

	const removeTodolistHandler = (id: string) => {
		// remove todolist
		axios
			.delete<any>(
				`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
				{headers: headersToken}
				)
			.then(res => {
				console.log(res.data)

			})
	}

	const updateTodolistHandler = (id: string, title: string) => {
		// update todolist title
	}

	const createTaskHandler = (title: string, todolistId: string) => {
		// create task
	}

	const removeTaskHandler = (taskId: string, todolistId: string) => {
		// remove task
	}

	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
		// update task status
	}

	const changeTaskTitleHandler = (title: string, task: any) => {
		// update task title
	}

	return (
		<div style={{margin: '20px'}}>
			<AddItemForm addItem={createTodolistHandler}/>

			{/* Todolists */}
			{todolists.map((tl: any) => {
				return (
					<div key={tl.id} style={todolist}>
						<div>
							<EditableSpan
								value={tl.title}
								onChange={(title: string) => updateTodolistHandler(tl.id, title)}
							/>
							<button onClick={() => removeTodolistHandler(tl.id)}>x</button>
						</div>
						<AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

						{/* Tasks */}
						{!!tasks[tl.id] &&
							tasks[tl.id].map((task: any) => {
								return (
									<div key={task.id}>
										<Checkbox
											checked={task.isDone}
											onChange={e => changeTaskStatusHandler(e, task)}
										/>
										<EditableSpan
											value={task.title}
											onChange={title => changeTaskTitleHandler(title, task)}
										/>
										<button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
									</div>
								)
							})}
					</div>
				)
			})}
		</div>
	)
}

// Styles
const todolist: React.CSSProperties = {
	border: '1px solid black',
	margin: '20px 0',
	padding: '10px',
	width: '300px',
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'column',
}