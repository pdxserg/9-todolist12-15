import { RootStateType } from "./store"
import { ErrorSnackbar } from "../common/components/ErrorSnackbar"

export const selectThemeMode = (state: RootStateType) => state.app.themeMode
export const selectErrorSnackbar = (state: RootStateType) => state.app.errorSnackbar
