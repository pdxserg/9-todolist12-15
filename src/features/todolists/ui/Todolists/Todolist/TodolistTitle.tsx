// @flow
import * as React from "react"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleTC, deleteTodolistTC, TodolistDomainType } from "../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"

type Props = {
  todo: TodolistDomainType
}
export const TodolistTitle = ({ todo }: Props) => {
  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(deleteTodolistTC(todo.id))
  }

  const updateTodolistHandler = (title: string) => {
    dispatch(changeTodolistTitleTC(todo.id, title))
  }
  return (
    <div className={"todolist-title-container"}>
      <h3>
        <EditableSpan value={todo.title} onChange={updateTodolistHandler} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={todo.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
