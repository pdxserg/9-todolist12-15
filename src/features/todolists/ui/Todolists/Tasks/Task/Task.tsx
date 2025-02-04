// @flow
import * as React from "react"
import { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import { getListItemSx } from "../../Todolist/Todolist.styles"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteTaskTC, updateTaskTC } from "../../../../model/tasks-reducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { EditableSpan } from "common/components"
import { TodolistDomainType } from "../../../../model/todolistsSlice"
import { ApiTaskType } from "../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../../common/enums/enums"

type Props = {
  task: ApiTaskType
  todo: TodolistDomainType
}
export const Task = ({ todo, task }: Props) => {
  const dispatch = useAppDispatch()

  const removeTask = () => {
    dispatch(deleteTaskTC({ taskId: task.id, todolistId: todo.id }))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC({ taskId: task.id, todoListId: todo.id, updates: { status } }))
  }
  const updateTask = (title: string) => {
    dispatch(updateTaskTC({ taskId: task.id, todoListId: todo.id, updates: { title } }))
  }
  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed ? true : false)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed ? true : false} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={updateTask} />
      </div>
      <IconButton onClick={removeTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
