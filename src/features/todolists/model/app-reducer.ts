// @flow

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
type InitialStateType = typeof initialState
const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: "null" as string | null,
}

export const AppReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "CHANGE_MODE": {
      return {
        ...state,
        themeMode: state.themeMode === "light" ? "dark" : "light",
      }
    }
    case "SET_STATUS":
      return { ...state, status: action.payload.status }
    case "SET_ERROR_SNACKBAR":
      return { ...state, error: action.payload.error }

    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: "SET_STATUS",
    payload: { status },
  } as const
}
export const setAppErrorAC = (error: null | string) => {
  return {
    type: "SET_ERROR_SNACKBAR",
    payload: { error },
  } as const
}

export const changeModeAC = () => {
  return {
    type: "CHANGE_MODE",
    payload: {},
  } as const
}

type ActionsType =
  | ReturnType<typeof changeModeAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
