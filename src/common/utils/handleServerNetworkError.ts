import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "../../features/todolists/model/appSlice"

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "failed" }))
  dispatch(setAppError({ error: err.message }))
}
