import { UnknownAction } from "redux"
import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { appReducer, appSlice } from "../features/todolists/model/appSlice"
import { thunk, ThunkDispatch } from "redux-thunk"
import { authReducer, authSlice } from "../features/auth/model/authSlice"

import { configureStore } from "@reduxjs/toolkit"

// const rootReducer = combineReducers({
//   todolists: todolistsReducer,
//   tasks: tasksReducer,
//   app: appReducer,
//   auth: authReducer,
// })

export const store = configureStore({
  reducer: {
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, UnknownAction>

// @ts-ignore
window.store = store
