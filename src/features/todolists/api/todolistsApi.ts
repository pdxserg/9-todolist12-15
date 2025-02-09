import { Respond } from "../../../common/types/types"
import { instance } from "../../../common/instance"
import { TodolistsType, TodolistType } from "./todolistsApi.types"
import { BaseQueryMeta, BaseQueryResult, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { TodolistDomainType } from "../model/todolistsSlice"

export const todolistsApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
      headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
    },
  }),
  endpoints: (builder) => ({
    getTodolists: builder.query<any[], void>({
      query: () => ({
        url: `/todo-lists`,
        method: "GET",
      }),
      transformResponse(respond: TodolistsType): TodolistDomainType[] {
        const todolists: TodolistDomainType[] = respond.map((el) => ({
          ...el,
          filter: "all",
          entityStatus: "idle",
        }))
        return todolists
      },
    }),
  }),
})

export const { useGetTodolistsQuery } = todolistsApi

export const _todolistsApi = {
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
