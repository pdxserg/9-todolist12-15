import { Respond, TodolistsType } from "./todolistsApi.types"
import { instance } from "../../../common/instance/instance"

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<TodolistsType>("/todo-lists")
  },
  createTodolists: (title: string) => {
    return instance.post<Respond<{ item: TodolistsType }>>("/todo-lists", { title })
  },
  deleteTodolist: (id: string) => {
    return instance.delete<Respond>(`/todo-lists/${id}`)
  },
  updateTodolist: (arg: { id: string; title: string }) => {
    const { id, title } = arg
    return instance.put<Respond>(`/todo-lists/${id}`, { title })
  },
}
