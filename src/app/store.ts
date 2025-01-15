import { combineReducers, legacy_createStore } from "redux"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { themeReducer } from "../features/todolists/model/theme-reducer"

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  themeMode: themeReducer,
})
export const store = legacy_createStore(rootReducer)

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// window.store = store
