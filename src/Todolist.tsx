import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./common/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx} from "./Todolist.styles";
import {addTaskAC, TaskType} from "./model/tasks-reducer";
import {TodolistType} from "./model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons";
import {useDispatch} from "react-redux";
import {Tasks} from "./Tasks";


type PropsType = {
	tasks: TaskType[]
	todo: TodolistType,
	removeTodolist: (todolistId: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
	const {
		tasks,
		removeTodolist,
		updateTodolist,
		todo
	} = props
	const todolistId = todo.id
	const dispatch = useDispatch()

	const removeTodolistHandler = () => {
		removeTodolist(todo.id)
	}

	const addTaskCallback = (title: string) => {
		dispatch(addTaskAC({title, todolistId}))
	}

	const updateTodolistHandler = (title: string) => {
		updateTodolist(todo.id, title)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3><EditableSpan value={todo.title} onChange={updateTodolistHandler}/></h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon/>
				</IconButton>
			</div>
			<AddItemForm addItem={addTaskCallback}/>
			<Tasks tasks={tasks} todo={todo}/>
			<Box sx={filterButtonsContainerSx}>
				<FilterTasksButtons todo={todo}/>
			</Box>
		</div>
	)
}
