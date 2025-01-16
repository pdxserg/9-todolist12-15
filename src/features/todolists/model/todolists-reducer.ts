import { v1 } from "uuid"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

const initialState: TodolistType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }

    case "ADD-TODOLIST": {
      const newTodolist: TodolistType = { id: action.payload.todoId, title: action.payload.title, filter: "all" }
      return [newTodolist, ...state]
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }

    default:
      return state
  }
}

// Action creators
export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id: todolistId } } as const
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

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilter>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
