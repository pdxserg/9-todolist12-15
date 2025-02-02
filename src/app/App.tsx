import "./App.css"
import React, { useEffect } from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import { Header } from "../common/components/Header"
import { getTheme } from "../common/theme/theme"
import { useAppSelector } from "../common/hooks/useAppSelector"
import { selectThemeMode } from "./appSelectors"
import { ErrorSnackbar } from "../common/components/ErrorSnackbar"
import { Path, Routing } from "../common/routing/Routing"
import { RootStateType } from "./store"
import { useNavigate } from "react-router"
import { useAppDispatch } from "../common/hooks"
import { initializeAppTC } from "../features/auth/model/auth-reducer"

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const isInitialized = useAppSelector((state: RootStateType) => state.auth.isInitialized)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeAppTC())
    }
  }, [])

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
