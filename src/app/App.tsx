import "./App.css"
import React, { useEffect } from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import { Header } from "../common/components/Header"
import { getTheme } from "../common/theme/theme"
import { useAppSelector } from "../common/hooks/useAppSelector"
import { ErrorSnackbar } from "../common/components/ErrorSnackbar"
import { Routing } from "../common/routing/Routing"
import { RootStateType } from "./store"
import { useAppDispatch } from "../common/hooks"
import { initializeAppTC } from "../features/auth/model/authSlice"
import { CircularProgress } from "@mui/material"
import { selectThemeMode } from "../features/todolists/model/appSlice"

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const isInitialized = useAppSelector((state: RootStateType) => state.auth.isInitialized)
  console.log(isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return <CircularProgress size={150} thickness={3} />
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}

export default App
