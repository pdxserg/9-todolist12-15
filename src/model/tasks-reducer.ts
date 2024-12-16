import {TasksStateType} from '../App'
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE_TASK': {
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
			taskId:"newId",
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
// Actions types
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
type ActionsType = RemoveTaskACType
|  AddTaskACType
| ChangeStatusTaskACType