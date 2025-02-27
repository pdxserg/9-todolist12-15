import { AppDispatch } from "../../../app/store"

import { RequestStatus, setAppStatus } from "./appSlice"
import { handleServerAppError } from "../../../common/utils/handleServerAppError"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"

import { createSlice } from "@reduxjs/toolkit"
import { TodolistsType, TodolistType } from "../api/todolistsApi.types"
import { _todolistsApi } from "../api/todolistsApi"

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
    setTodolist: create.reducer<{ todolists: TodolistsType }>((state, action) => {
      const todolists: TodolistDomainType[] = action.payload.todolists.map((el) => ({
        ...el,
        filter: "all",
        entityStatus: "idle",
      }))
      return todolists
    }),
    removeTodolist: create.reducer<{ todolistId: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: create.reducer<{ todolist: TodolistType }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    }),
    changeTodolistEntityStatus: create.reducer<{ todolistId: string; status: RequestStatus }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].entityStatus = action.payload.status
      }
    }),
    changeTodolistTitle: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilter: create.reducer<{ todolistId: string; filter: FilterValuesType }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    }),
    resetStore: create.reducer((state) => {
      return []
    }),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
export const {
  removeTodolist,
  addTodolist,
  setTodolist,
  changeTodolistEntityStatus,
  changeTodolistTitle,
  changeTodolistFilter,
  resetStore,
} = todolistsSlice.actions

//thunk
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTodolist({ todolists: res.data }))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _todolistsApi
    .createTodolists(title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(addTodolist({ todolist: res.data.data.item }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(changeTodolistEntityStatus({ todolistId, status: "loading" }))
  dispatch(setAppStatus({ status: "loading" }))
  _todolistsApi
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTodolist({ todolistId }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
  _todolistsApi
    .updateTodolist({ todolistId, title })
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTodolistTitle({ todolistId, title }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
