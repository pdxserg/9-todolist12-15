// @flow
import * as React from "react"
import s from "common/components/page404/Page404.module.css"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { Path } from "../../routing/Routing"

export const Page404 = () => {
  return (
    <div className={s.page404}>
      <h1>404</h1>
      <h2>page not found</h2>
      <Button variant="contained" href={Path.Main}>
        Main Menu
      </Button>
    </div>
  )
}
