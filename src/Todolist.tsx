import {AddItemForm} from "./AddItemForm";
import {addTaskAC} from "./model/tasks-reducer";
import {TodolistType} from "./model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons";
import {useDispatch} from "react-redux";
import {Tasks} from "./Tasks";
import {TodolistTitle} from "./TodolistTitle";


type PropsType = {
	todo: TodolistType,
}
export const Todolist = ({todo}: PropsType) => {

	const todolistId = todo.id
	const dispatch = useDispatch()

	const addTask= (title: string) => {
		dispatch(addTaskAC({title, todolistId}))
	}

	return (
		<div>
			<TodolistTitle todo={todo}/>
			<AddItemForm addItem={addTask}/>
			<Tasks todo={todo}/>
			<FilterTasksButtons todo={todo}/>
		</div>
	)
}
