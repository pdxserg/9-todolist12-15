import { Inputs } from "../ui/Login/Login"
import { Dispatch } from "redux"
import { setAppStatusAC } from "../../todolists/model/app-reducer"
import { todolistsApi } from "../../todolists/api/todolistsApi"
import { handleServerAppError } from "../../../common/utils/handleServerAppError"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"

import { authApi } from "../api/authApi"

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
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
