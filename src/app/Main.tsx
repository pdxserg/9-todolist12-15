// @flow
import * as React from "react"
import { useEffect } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { AddItemForm } from "../common/components/AddItemForm"
import Container from "@mui/material/Container"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppSelector } from "../common/hooks"
import { useNavigate } from "react-router"
import { Path } from "../common/routing/Routing"

import { useCreateTodolistMutation } from "../features/todolists/api/todolistsApi"
import { selectIsLoggedIn } from "../features/todolists/model/appSlice"

export const Main = () => {
  const [createTodolist] = useCreateTodolistMutation()
  const addTodolist = (title: string) => {
    createTodolist(title)
  }

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
