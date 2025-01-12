import axios from "axios";
import {Respond, TodolistsType} from "./todolistsApi.types";
import {headersToken} from "../../../app/token/token";

export const todolistsApi={
	 getTodolists: ()=>{
		 return axios.get<TodolistsType>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
			headers: headersToken
		})
	},
	createTodolists: (title:string)=>{
		return axios
			.post<Respond<{item: TodolistsType}>>(
				'https://social-network.samuraijs.com/api/1.1/todo-lists',
				{title}, {headers: headersToken})
	},
	deleteTodolist:(id:string)=>{
	return 	axios
			.delete<Respond>(
				`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
				{headers: headersToken}
			)
	},
	updateTodolist:(arg:{id: string, title: string})=>{
		 const {id,title}=arg
		return axios
			.put<any>(
				`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
				{title},
				{headers: headersToken}
			)
	}


}

