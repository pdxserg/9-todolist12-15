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
      {/*<IconButton href="mailto:fakeuser@fakeemail.com">ssss</IconButton>*/}
      <Button variant="contained" href={Path.Main}>
        Main Menu
      </Button>
    </div>
  )
}
// .title {
//   text-align: center;
//   font-size: 250px;
//   margin: 0;
// }
//
// .subTitle {
//   text-align: center;
//   font-size: 50px;
//   margin: 0;
//   text-transform: uppercase;
// }
