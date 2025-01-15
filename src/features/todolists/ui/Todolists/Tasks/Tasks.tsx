// @flow
import * as React from "react"
import List from "@mui/material/List"
import { TodolistType } from "../../../model/todolists-reducer"
import { Task } from "./Task/Task"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTasks } from "../../../model/tasksSelectors"

type Props = {
  todo: TodolistType
}
export const Tasks = ({ todo }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const allTodolistTasks = tasks[todo.id]
  let tasksForTodolist = allTodolistTasks

  if (todo.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
  }

  if (todo.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
  }
  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map((task) => {
            return <Task task={task} todo={todo} />
          })}
        </List>
      )}
    </>
  )
}
