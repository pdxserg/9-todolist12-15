import { TodolistsType, TodolistType } from "../api/todolistsApi.types"
import { AppDispatch } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppStatusAC } from "./app-reducer"
import { handleServerAppError } from "../../../common/utils/handleServerAppError"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"
import { addTaskAC } from "./tasks-reducer"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }

    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
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
      const todos: TodolistDomainType[] = action.payload.todolists.map((el) => ({
        ...el,
        filter: "all",
        entityStatus: "idle",
      }))
      console.log(todos)
      return todos
    }
    case "CHANGE-TODOLIST-ENSTATUS": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.status } : tl))
    }

    default:
      return state
  }
}

// Action creators
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatus) => {
  return { type: "CHANGE-TODOLIST-ENSTATUS", payload: { id, status } } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id: todolistId } } as const
}
export const setTodolistAC = (todolists: TodolistsType) => {
  return { type: "SET-TODOLIST", payload: { todolists } } as const
}

export const addTodolistAC = (todolist: TodolistType) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload: { id, title } } as const
}

export const changeTodolistFilter = (id: string, filter: FilterValuesType) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload: { id, filter } } as const
}
//thunk
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi.getTodolists().then((res) => {
    dispatch(setAppStatusAC("succeeded"))
    dispatch(setTodolistAC(res.data))
  })
}
export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .createTodolists(title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(addTodolistAC(res.data.data.item))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(removeTodolistAC(todolistId))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: AppDispatch) => {
  todolistsApi
    .updateTodolist({ id, title })
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(changeTodolistTitleAC(id, title))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilter>
export type SetTodolistsActionType = ReturnType<typeof setTodolistAC>
export type ChangeTodolistEntityStatusAC = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusAC
