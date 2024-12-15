import {v1} from "uuid";
import {TasksStateType} from "../App";


let todolistID1 = v1()
let todolistID2 = v1()

const initialState:TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsTasksType):TasksStateType=> {
	switch (action.type) {
		// case 'REMOVE-TODOLIST': {
		//
		// }

		case 'ADD-TASK': {

		}

		// case 'CHANGE-TODOLIST-TITLE': {
		//
		// }


		default:
			return state
	}
}

// Action creators
export const addTaskAC=()=>{}
// export const removeTodolistAC = (todolistId: string)=> {
// 	return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
// }

// Actions types
// export type RemoveTodolistActionType = ReturnType <typeof removeTodolistAC>


type ActionsTasksType = {}


