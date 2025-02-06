import { TodolistsType, TodolistType } from "./todolistsApi.types"

import { Respond } from "../../../common/types/types"
import { instance } from "../../../common/instance"

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<TodolistsType>("/todo-lists")
  },
  createTodolists: (title: string) => {
    return instance.post<Respond<{ item: TodolistType }>>("/todo-lists", { title })
  },
  deleteTodolist: (id: string) => {
    return instance.delete<Respond>(`/todo-lists/${id}`)
  },
  updateTodolist: (arg: { todolistId: string; title: string }) => {
    const { todolistId, title } = arg
    return instance.put<Respond>(`/todo-lists/${todolistId}`, { title })
  },
}
