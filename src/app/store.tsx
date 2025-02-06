import { combineReducers, UnknownAction } from "redux"
import { todolistsReducer } from "../features/todolists/model/todolistsSlice"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { appReducer } from "../features/todolists/model/appSlice"
import { thunk, ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/authSlice"

import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({ reducer: rootReducer })

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, UnknownAction>

// @ts-ignore
window.store = store
