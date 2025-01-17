import { v1 } from "uuid"
import { TodolistsType, TodolistType } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { AppDispatch, RootStateType } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }

    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomainType = {
        id: action.payload.todoId,
        title: action.payload.title,
        filter: "all",
        addedDate: "",
        order: 0,
      }
      console.log(newTodolist)
      return [newTodolist, ...state]
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }
    case "SET-TODOLIST": {
      // return state
      const todos: TodolistDomainType[] = action.payload.todolists.map((el) => ({ ...el, filter: "all" }))
      console.log(todos)
      return todos
    }
    default:
      return state
  }
}

// Action creators

export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id: todolistId } } as const
}
export const setTodolistAC = (todolists: TodolistsType) => {
  return { type: "SET-TODOLIST", payload: { todolists } } as const
}

export const addTodolistAC = (title: string) => {
  return { type: "ADD-TODOLIST", payload: { title, todoId: v1() } } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload: { id, title } } as const
}

export const changeTodolistFilter = (id: string, filter: FilterValuesType) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload: { id, filter } } as const
}
//thunk
export const fetchTodolistsThunk = (dispatch: AppDispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistAC(res.data))
  })
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilter>
export type SetTodolistsActionType = ReturnType<typeof setTodolistAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
