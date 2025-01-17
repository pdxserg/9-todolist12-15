import { AddTodolistActionType, RemoveTodolistActionType, setTodolistAC } from "./todolists-reducer"
import { v1 } from "uuid"
import { ApiTaskType } from "../api/tasksApi.types"
import { TaskPriority, TaskStatus } from "../../../common/enums/enums"
import { AppDispatch } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"
import { tasksApi } from "../api/tasksApi"

export type TasksStateType = {
  [key: string]: ApiTaskType[]
}

const initState: TasksStateType = {}
export const tasksReducer = (state = initState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE_TASK": {
      console.log("w")
      const newTodolistTasks = {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
      return newTodolistTasks
    }
    case "ADD_TASK": {
      const newTodolistTasks = {
        ...state,
        [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
      }

      return newTodolistTasks
    }
    case "CHANGE_STATUS_TASK": {
      const newTodolistTasks = {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id == action.payload.taskId
            ? {
                ...t,
                status: action.payload.status,
              }
            : t,
        ),
      }
      return newTodolistTasks
    }
    case "REMOVE-TODOLIST": {
      let copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todoId]: [] }
    }
    case "UPDATE_TASK": {
      const newTodolistTasks = {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                title: action.payload.title,
              }
            : t,
        ),
      }
      return newTodolistTasks
    }
    case "SET_TASKS": {
      return { ...state, [action.payload.todolistId]: action.payload.tasks }
    }

    default:
      return state
  }
}
// thunk

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ tasks, todolistId }))
  })
}
export const deleteTaskTC = (arg: { todolistId: string; taskId: string }) => (dispatch: AppDispatch) => {
  tasksApi.deleteTask(arg).then(() => {
    dispatch(removeTaskAC(arg))
  })
}
export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.createTask(arg).then((res) => {
    dispatch(addTaskAC({ task: res.data.data.item }))
  })
}
// export const updateTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
//   tasksApi.updateTask(arg).then(() => {
//     dispatch(addTaskAC(arg))
//   })
// }
// Action creators
export const setTasksAC = (payload: { tasks: ApiTaskType[]; todolistId: string }) => {
  return {
    type: "SET_TASKS",
    payload,
  } as const
}
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE_TASK",
    payload,
  } as const
}
export const addTaskAC = (payload: { task: ApiTaskType }) => {
  return {
    type: "ADD_TASK",
    payload,
  } as const
}
export const changeStatusTaskAC = (payload: { taskId: string; todolistId: string; status: TaskStatus }) => {
  return {
    type: "CHANGE_STATUS_TASK",
    payload,
  } as const
}
export const updateTaskAC = (payload: { taskId: string; todolistId: string; title: string }) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const
}
// Actions types
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export type SetTasksAC = ReturnType<typeof setTasksAC>
type ActionsType =
  | RemoveTaskACType
  | AddTaskACType
  | ChangeStatusTaskACType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | UpdateTaskACType
  | SetTasksAC
