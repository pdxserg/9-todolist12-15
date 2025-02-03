// @flow

import App from "../../app/App"
import { Route, Routes, useNavigate } from "react-router"
import { Login } from "../../features/auth/ui/Login/Login"
import { Page404 } from "../components/page404/Page404"
import { Main } from "../../app/Main"
import { useAppSelector } from "../hooks"
import { RootStateType } from "../../app/store"
import { useEffect } from "react"

export const Path = {
  Main: "/",
  Login: "/login",
  NotFound: "/*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<Page404 />} />
    </Routes>
  )
}
