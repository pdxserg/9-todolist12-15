import { TasksStateType } from '../App'

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case '': {
			return state
		}

		default:
			throw new Error("I don't understand this type")
	}
}

// Action creators
export const someAC = (todolistId: string) => {
	return { type: '', payload: {} } as const
}

// Actions types
export type SomeActionType = ReturnType<typeof someAC>

type ActionsType = SomeActionType