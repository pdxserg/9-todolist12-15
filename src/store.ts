import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./model/todolists-reducer";
import {tasksReducer} from "./model/tasks-reducer";
import {themeReducer} from "./model/theme-reducer";

const rootReducer=combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	themeMode: themeReducer
})
export const store= legacy_createStore(rootReducer)

export type RootStateType= ReturnType<typeof store.getState>

// window.store = store