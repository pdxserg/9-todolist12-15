import axios from "axios";
import {Respond, TodolistsType} from "./todolistsApi.types";
import {headersToken} from "../../../app/token/token";
import {instance} from "../../../common/instance/instance";

export const todolistsApi={
	 getTodolists: ()=>{
		 return instance.get<TodolistsType>('/todo-lists')
	},
	createTodolists: (title:string)=>{
		return instance.post<Respond<{item: TodolistsType}>>('/todo-lists', {title})
	},
	deleteTodolist:(id:string)=>{
	return 	instance.delete<Respond>(`/${id}`)
	},
	updateTodolist:(arg:{id: string, title: string})=>{
		 const {id,title}=arg
		return instance.put<any>(`/${id}`, {title})
	}


}

