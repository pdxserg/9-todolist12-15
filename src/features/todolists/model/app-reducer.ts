// @flow

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
type InitialStateType = typeof initialState
const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
}

export const AppReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "CHANGE_MODE": {
      return {
        ...state,
        themeMode: state.themeMode === "light" ? "dark" : "light",
      }
    }
    default:
      return state
  }
}
export const changeModeAC = () => {
  return {
    type: "CHANGE_MODE",
    payload: {},
  } as const
}
type ChangeModeACType = ReturnType<typeof changeModeAC>

type ActionsType = ChangeModeACType
