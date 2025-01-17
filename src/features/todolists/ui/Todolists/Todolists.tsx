// @flow
import * as React from "react"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectTodolists } from "../../model/todolistsSelectors"
import { useEffect } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { Paper } from "@mui/material"
import { Todolist } from "./Todolist/Todolist"
import { fetchTodolistsTC } from "../../model/todolists-reducer"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <div>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist todo={tl} />
            </Paper>
          </Grid>
        )
      })}
    </div>
  )
}
