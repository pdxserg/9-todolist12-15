import { Dispatch } from "redux"
import { setAppErrorAC, setAppStatusAC } from "../../features/todolists/model/appSlice"

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppStatusAC("failed"))
  dispatch(setAppErrorAC(err.message))
}
