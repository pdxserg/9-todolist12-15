// @flow
import * as React from "react"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleAC, removeTodolistAC, TodolistType } from "../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"

type Props = {
  todo: TodolistType
}
export const TodolistTitle = ({ todo }: Props) => {
  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(todo.id))
  }

  const updateTodolistHandler = (title: string) => {
    dispatch(changeTodolistTitleAC(todo.id, title))
  }
  return (
    <div className={"todolist-title-container"}>
      <h3>
        <EditableSpan value={todo.title} onChange={updateTodolistHandler} />
      </h3>
      <IconButton onClick={removeTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
