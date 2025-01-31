import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { AppReducer } from "../features/todolists/model/app-reducer"
import { thunk, ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/auth-reducer"

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: AppReducer,
  auth: authReducer,
})
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, UnknownAction>

// window.store = store
