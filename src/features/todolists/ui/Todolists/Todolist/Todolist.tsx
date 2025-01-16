import { AddItemForm } from "../../../../../common/components/AddItemForm"
import { addTaskAC } from "../../../model/tasks-reducer"
import { FilterTasksButtons } from "../FilterTasksButtons"

import { Tasks } from "../Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle"
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch"
import { TodolistDomainType } from "../../../model/todolists-reducer"

type PropsType = {
  todo: TodolistDomainType
}
export const Todolist = ({ todo }: PropsType) => {
  const todolistId = todo.id
  const dispatch = useAppDispatch()

  const addTask = (title: string) => {
    dispatch(addTaskAC({ title, todolistId }))
  }

  return (
    <div>
      <TodolistTitle todo={todo} />
      <AddItemForm addItem={addTask} />
      <Tasks todo={todo} />
      <FilterTasksButtons todo={todo} />
    </div>
  )
}
