import {TasksStateType} from '../App'

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE_TASK': {
			const newTodolistTasks = {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
			return newTodolistTasks
		}
		case 'ADD_TASK': {
return state
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
// Actions types
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>

type ActionsType = RemoveTaskACType
|  AddTaskACType