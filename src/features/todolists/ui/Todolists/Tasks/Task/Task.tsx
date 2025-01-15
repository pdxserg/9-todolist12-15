// @flow
import * as React from "react"
import { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import { getListItemSx } from "../../Todolist/Todolist.styles"
import Checkbox from "@mui/material/Checkbox"

import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { TodolistType } from "../../../../model/todolists-reducer"

import { changeStatusTaskAC, removeTaskAC, TaskType, updateTaskAC } from "../../../../model/tasks-reducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { EditableSpan } from "common/components"

type Props = {
  task: TaskType
  todo: TodolistType
}
export const Task = ({ todo, task }: Props) => {
  const dispatch = useAppDispatch()

  const removeTask = () => {
    dispatch(removeTaskAC({ taskId: task.id, todolistId: todo.id }))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
    dispatch(changeStatusTaskAC({ taskId: task.id, todolistId: todo.id, status }))
  }
  const updateTask = (title: string) => {
    dispatch(updateTaskAC({ taskId: task.id, todolistId: todo.id, title }))
  }
  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={updateTask} />
      </div>
      <IconButton onClick={removeTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
