import {TasksStateType, TodolistType} from '../App'
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE_TASK': {
			console.log("w")
			const newTodolistTasks = {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
			return newTodolistTasks
		}
		case 'ADD_TASK': {
			const newTask = {
				id: action.payload.taskId,
				title: action.payload.title,
				isDone: false
			}
			const newTodolistTasks = {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
return newTodolistTasks
			}
		case 'CHANGE_STATUS_TASK': {
			const newTodolistTasks = {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id == action.payload.taskId ? {...t, isDone: action.payload.status} : t)
			}
			return newTodolistTasks
		}
		case 'REMOVE-TODOLIST':{
			let copyState = { ...state }
			delete copyState[action.payload.id]
			return copyState
		 }
		case 'ADD-TODOLIST': {

			return {...state, [action.payload.todoId]:[]}
		}
		case 'UPDATE_TASK':{
			const newTodolistTasks = {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t,  title:action.payload.title } : t)
			}
			return  newTodolistTasks
		}

		default:
			return state
	}
}

// Action creators
export const removeTaskAC = (taskId: string, todolistId: string) => {
	return {
		type: 'REMOVE_TASK',
		payload: {
			taskId,
			todolistId
		}
	} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
	return {
		type: 'ADD_TASK',
		payload: {
			taskId:v1(),
			title,
			todolistId
		}
	} as const
}
export const changeStatusTaskAC = (taskId: string, todolistId: string, status:boolean) => {
	return {
		type: 'CHANGE_STATUS_TASK',
		payload: {
			taskId, todolistId, status,
		}
	} as const
}
export const updateTaskAC = (taskId: string, todolistId: string, title:string) => {
	return {
		type: 'UPDATE_TASK',
		payload: {
			taskId, todolistId, title,
		}
	} as const
}
// Actions types
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type ActionsType = RemoveTaskACType
|  AddTaskACType
| ChangeStatusTaskACType
| RemoveTodolistActionType
| AddTodolistActionType
| UpdateTaskACType