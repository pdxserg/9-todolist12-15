import { TaskPriority, TaskStatus } from "common/enums/enums"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}
export type DomainTask = {
  description: string | null
  title: string
  completed: boolean
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  title: string
  description: string | null
  completed: boolean
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
