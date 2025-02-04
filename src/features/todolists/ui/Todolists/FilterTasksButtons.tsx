// @flow
import * as React from "react"
import Button from "@mui/material/Button"
import { changeTodolistFilter, FilterValuesType, TodolistDomainType } from "../../model/todolistsSlice"

import { filterButtonsContainerSx } from "./Todolist/Todolist.styles"
import Box from "@mui/material/Box"
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch"

type PropsType = {
  todo: TodolistDomainType
}
export const FilterTasksButtons = ({ todo }: PropsType) => {
  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilter(todo.id, filter))
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={todo.filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </Button>
      <Button
        variant={todo.filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={todo.filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
