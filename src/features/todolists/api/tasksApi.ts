import { instance } from "common/instance"
import { ApiTaskType, GetTasksResponse, UpdateTaskDomainModel, UpdateTaskModel } from "./tasksApi.types"
import { Respond } from "common/types/types"

export const tasksApi = {
  getTasks: (todolistId: string) => {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask: (arg: { title: string; todolistId: string }) => {
    const { title, todolistId } = arg
    return instance.post<Respond<{ item: ApiTaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask: (arg: { todolistId: string; taskId: string }) => {
    const { taskId, todolistId } = arg
    return instance.delete<Respond>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask: (arg: { task: ApiTaskType; updates: UpdateTaskDomainModel }) => {
    const { task, updates } = arg
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...updates,
    }
    return instance.put<Respond<{ item: ApiTaskType }>>(`/todo-lists/${task.todoListId}/tasks/${task.id}`, model)
  },
}
