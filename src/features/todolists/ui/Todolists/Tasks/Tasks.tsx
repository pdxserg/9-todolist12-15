// @flow
import * as React from "react"
import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTasks } from "../../../model/tasksSelectors"
import { TodolistDomainType } from "../../../model/todolistsSlice"
import { useEffect } from "react"
import { fetchTasksTC } from "../../../model/tasks-reducer"
import { useAppDispatch } from "../../../../../common/hooks"
import { TaskStatus } from "../../../../../common/enums/enums"

type Props = {
  todo: TodolistDomainType
}
export const Tasks = ({ todo }: Props) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTasksTC(todo.id))
  }, [])

  const allTodolistTasks = tasks[todo.id]
  let tasksForTodolist = allTodolistTasks

  if (todo.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task: any) => task.status === TaskStatus.New)
  }

  if (todo.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task: any) => task.status === TaskStatus.Completed)
  }
  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task: any) => {
            return <Task key={task.id} task={task} todo={todo} />
          })}
        </List>
      )}
    </>
  )
}
