import { Dispatch } from "redux"
import { setAppErrorAC, setAppStatus } from "../../features/todolists/model/appSlice"

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppStatus("failed"))
  dispatch(setAppErrorAC(err.message))
}
