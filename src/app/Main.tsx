// @flow
import * as React from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { AddItemForm } from "../common/components/AddItemForm"
import Container from "@mui/material/Container"

import { addTodolistAC, addTodolistTC } from "../features/todolists/model/todolistsSlice"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch } from "../common/hooks/useAppDispatch"
import { useAppSelector } from "../common/hooks"
import { RootStateType } from "./store"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { Path } from "../common/routing/Routing"

export const Main = () => {
  const dispatch = useAppDispatch()
  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }
  const isLoggedIn = useAppSelector((state: RootStateType) => state.auth?.isLoggedIn)
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
