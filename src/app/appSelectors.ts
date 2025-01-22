import { RootStateType } from "./store"

export const selectThemeMode = (state: RootStateType) => state.app.themeMode
