import { TaskPriority, TaskStatus } from "common/enums/enums"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: ApiTaskType[]
}
export type ApiTaskType = {
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
// UpdateTaskDomainModel это такой же тип как и UpdateTaskModel,
// только все свойства в нем являются необязательными
export type UpdateTaskDomainModel = {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}
