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
    case "SET_STATUS":
      return { ...state, status: action.payload.status }
    case "CHANGE_STATUS":
      return { ...state, status: action.payload.status }

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
export const changeAppStatusAC = (status: RequestStatus) => {
  return {
    type: "CHANGE_STATUS",
    payload: { status },
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
  | ReturnType<typeof changeAppStatusAC>
