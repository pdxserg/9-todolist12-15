import {Respond, TodolistsType} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";
import {DomainTask} from "./tasksApi.types";

export const tasksApi={
	 getTasks: ()=>{
		 return instance.get<TodolistsType>('/todo-lists')
	},
	createTask: (arg:{title: string,todolistId:string})=>{
		 const{title,todolistId}=arg
		return instance.post<Respond<{item: DomainTask}>>(`/todo-lists/${todolistId}/tasks`, {title})
	},
	deleteTask:(arg:{todolistId:string,taskId:string})=>{
	return 	instance.delete<Respond>(`/todo-lists/${todolistId}/tasks/${taskId}`
	},
	updateTask:(arg:{id: string, title: string})=>{
		 const {id,title}=arg
		return instance.put<Respond>(`/todo-lists/${id}`, {title})
	}

}

