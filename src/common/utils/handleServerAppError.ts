import { setAppErrorAC, setAppStatus } from "../../features/todolists/model/appSlice"
import { Dispatch } from "redux"
import { Respond } from "../types/types"

export const handleServerAppError = <T>(data: Respond<T>, dispatch: Dispatch) => {
  dispatch(setAppStatus("failed"))
  dispatch(setAppErrorAC(data.messages[0]))
}
