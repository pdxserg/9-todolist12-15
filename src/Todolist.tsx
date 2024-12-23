import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./common/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx} from "./Todolist.styles";
import {addTaskAC} from "./model/tasks-reducer";
import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from "./model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons";
import {useDispatch} from "react-redux";
import {Tasks} from "./Tasks";


type PropsType = {
	todo: TodolistType,
}
export const Todolist = ({todo}: PropsType) => {

	const todolistId = todo.id
	const dispatch = useDispatch()

	const removeTodolistHandler = () => {
		dispatch(removeTodolistAC(todolistId))
	}
	const addTaskCallback = (title: string) => {
		dispatch(addTaskAC({title, todolistId}))
	}
	const updateTodolistHandler = (title: string) => {
		dispatch(changeTodolistTitleAC(todolistId, title))
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
			<Tasks todo={todo}/>
			<Box sx={filterButtonsContainerSx}>
				<FilterTasksButtons todo={todo}/>
			</Box>
		</div>
	)
}
