import "./App.css"
import React, { useEffect, useState } from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import { Header } from "../common/components/Header"
import { getTheme } from "../common/theme/theme"
import { useAppSelector } from "../common/hooks/useAppSelector"
import { ErrorSnackbar } from "../common/components/ErrorSnackbar"
import { Routing } from "../common/routing/Routing"
import { RootStateType } from "./store"
import { useAppDispatch } from "../common/hooks"
import { CircularProgress } from "@mui/material"
import { selectThemeMode, setIsLoggedIn } from "../features/todolists/model/appSlice"
import { useMeQuery } from "../features/auth/api/authApi"

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  // const isInitialized = useAppSelector(isInitializ)
  // console.log("isInitialized", isInitialized)

  const { data, isLoading } = useMeQuery()
  console.log(data)
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading])

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
