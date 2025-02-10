import { UnknownAction } from "redux"
import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { appReducer, appSlice } from "../features/todolists/model/appSlice"
import { ThunkDispatch } from "redux-thunk"

import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"

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
    // [authSlice.name]: authReducer,
    // [todolistsApi.reducerPath]: todolistsApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})
setupListeners(store.dispatch)
export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, UnknownAction>

// @ts-ignore
window.store = store
