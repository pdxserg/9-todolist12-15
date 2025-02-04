import { TodolistsType, TodolistType } from "../api/todolistsApi.types"
import { AppDispatch } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppStatus } from "./appSlice"
import { handleServerAppError } from "../../../common/utils/handleServerAppError"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"
import { addTaskAC } from "./tasks-reducer"
import { createSlice } from "@reduxjs/toolkit"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

const initialState: TodolistDomainType[] = []
export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: (create) => ({
    removeTodolist: create.reducer<{ todolistId: string }>((state, action) => {
      state.filter((tl) => tl.id !== action.payload.todolistId)
    }),
    addTodolist: create.reducer<{ todolist: TodolistType }>((state, action) => {
      const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
      state = produce(state, (draft) => {
        draft.push(newTodolist)
      })
    }),
    // const addedTodosArray = produce(todosArray, draft => {
    //   draft.push({id: "id3", done: false, body: "Buy bananas"})
    // })
  }),
})

export const todolistsReducer = todolistsSlice.reducer
export const {} = todolistsSlice.actions

export const _todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }

    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
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
      return todos
    }
    case "CHANGE-TODOLIST-ENSTATUS": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.status } : tl))
    }
    case "LOGOUT": {
      return initialState
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
export const resetStore = () => {
  return { type: "LOGOUT" } as const
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
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTodolistAC(res.data))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .createTodolists(title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
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
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTodolist({ todolistId: string }))
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
        dispatch(setAppStatus({ status: "succeeded" }))
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
export type ResetStore = ReturnType<typeof resetStore>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusAC
  | ResetStore
