import { SyntheticEvent, useState } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectErrorSnackbar } from "../../app/appSelectors"
import { setErrorSnackbarAC } from "../../features/todolists/model/app-reducer"

export const ErrorSnackbar = () => {
  // const [open, setOpen] = useState(true)
  const dispatch = useAppDispatch()

  const errorSnackbar = useAppSelector(selectErrorSnackbar)
  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    // @ts-ignore
    dispatch(setErrorSnackbarAC(false))
    // setOpen(false)
  }

  return (
    <Snackbar open={errorSnackbar} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        Error message!!!
      </Alert>
    </Snackbar>
  )
}
