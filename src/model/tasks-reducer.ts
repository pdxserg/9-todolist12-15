import {TasksStateType} from '../App'

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE_TASK': {
			const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
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

// Actions types
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>

type ActionsType = RemoveTaskACType