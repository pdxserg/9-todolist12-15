// @flow
import * as React from "react"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "./MenuButton"
import Switch from "@mui/material/Switch"
import AppBar from "@mui/material/AppBar"
import { changeMode, selectThemeMode, setIsLoggedIn } from "../../features/todolists/model/appSlice"
import { getTheme } from "../theme/theme"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { LinearProgress } from "@mui/material"
import { RootStateType } from "../../app/store"
import { useLogOutMutation } from "../../features/auth/api/authApi"
import { resetStore } from "../../features/todolists/model/todolistsSlice"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector((state) => state.app.status)
  const isLoggedIn = useAppSelector((state: RootStateType) => state.app.isLoggedIn)

  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const [logOut] = useLogOutMutation()

  const changeModeHandler = () => {
    dispatch(changeMode())
  }
  const logoutHandler = () => {
    // dispatch(logOutTC())
    logOut().then((res) => {
      if (res.data?.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
        dispatch(resetStore())
      }
    })
  }
  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {/*<MenuButton>Login</MenuButton>*/}
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress color="secondary" />}
    </AppBar>
  )
}
