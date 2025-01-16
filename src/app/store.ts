import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { themeReducer } from "../features/todolists/model/theme-reducer"
import { thunk, ThunkDispatch } from "redux-thunk"

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  themeMode: themeReducer,
})
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, UnknownAction>

// window.store = store
