import { SyntheticEvent, useState } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectErrorSnackbar, setAppError } from "../../features/todolists/model/appSlice"

export const ErrorSnackbar = () => {
  // const [open, setOpen] = useState(true)
  const dispatch = useAppDispatch()

  const error = useAppSelector(selectErrorSnackbar)
  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppError({ error: null }))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
