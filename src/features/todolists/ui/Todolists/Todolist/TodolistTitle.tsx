// @flow
import * as React from "react"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleTC, deleteTodolistTC, TodolistDomainType } from "../../../model/todolistsSlice"
import { useAppDispatch } from "common/hooks"
import { useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../api/todolistsApi"

type Props = {
  todo: TodolistDomainType
}
export const TodolistTitle = ({ todo }: Props) => {
  const todolistId = todo.id

  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolist] = useUpdateTodolistMutation()

  const removeTodolistHandler = () => {
    deleteTodolist(todolistId)
  }

  const updateTodolistHandler = (title: string) => {
    updateTodolist({ todolistId, title })
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
