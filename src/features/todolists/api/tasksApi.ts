import { instance } from "common/instance"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { Respond } from "common/types/types"

export const tasksApi = {
  getTasks: (taskId: string) => {
    return instance.get<GetTasksResponse>(`/todo-lists/${taskId}/tasks`)
  },
  createTask: (arg: { title: string; todolistId: string }) => {
    const { title, todolistId } = arg
    return instance.post<Respond<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask: (arg: { todolistId: string; taskId: string }) => {
    const { taskId, todolistId } = arg
    return instance.delete<Respond>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask: (arg: { task: DomainTask; title: string }) => {
    const { task, title } = arg
    const model: UpdateTaskModel = {
      title,
      description: task.description,
      completed: task.completed,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    return instance.put<Respond<{ item: DomainTask }>>(`/todo-lists/${task.todoListId}/tasks/${task.id}`, model)
  },
}
