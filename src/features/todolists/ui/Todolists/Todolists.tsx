// @flow
import * as React from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { Paper } from "@mui/material"
import { Todolist } from "./Todolist/Todolist"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

  return (
    <div>
      {todolists?.map((tl: any) => {
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
