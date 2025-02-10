import { Inputs } from "../ui/Login/Login"
import { instance } from "../../../common/instance"
import { Respond } from "../../../common/types/types"
import { baseApi } from "../../../app/baseApi"
import { TodolistsType, TodolistType } from "../../todolists/api/todolistsApi.types"
import { TodolistDomainType } from "../../todolists/model/todolistsSlice"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<Respond<{ id: number; email: string; login: string }>, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
    login: builder.mutation<Respond<{ userId: number; token: string }>, Inputs>({
      query: (args) => ({
        url: "/auth/login",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Task"],
    }),
    logOut: builder.mutation<Respond, void>({
      query: () => ({
        url: "/auth/login",
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogOutMutation } = authApi

export const _authApi = {
  login: (args: Inputs) => {
    return instance.post<Respond<{ userId: number; token: string }>>("/auth/login", args)
  },
  logOut: () => {
    return instance.delete<Respond>("/auth/login")
  },
  me: () => {
    return instance.get<Respond<{ id: number; email: string; login: string }>>("/auth/me")
  },
}
