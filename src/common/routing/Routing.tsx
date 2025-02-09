// @flow
import { Route, Routes } from "react-router"
import { Login } from "../../features/auth/ui/Login/Login"
import { Page404 } from "../components/page404/Page404"
import { Main } from "../../app/Main"

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
