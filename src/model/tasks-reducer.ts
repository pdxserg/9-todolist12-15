import { TasksStateType } from '../App'

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case '': {
			return state
		}

		default:
			return state
	}
}

// Action creators
export const removeTaskAC = (todolistId: string) => {
	return { type: '', payload: {} } as const
}

// Actions types
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>

type ActionsType = RemoveTaskACType