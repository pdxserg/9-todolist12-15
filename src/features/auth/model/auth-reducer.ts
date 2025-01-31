import { Inputs } from "../ui/Login/Login"
import { Dispatch } from "redux"
import { setAppStatusAC } from "../../todolists/model/app-reducer"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

// thunks
export const loginTC = (data: Inputs) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
}
