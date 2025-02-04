import { AddTodolistActionType, RemoveTodolistActionType, ResetStore } from "./todolists-reducer"
import { ApiTaskType, UpdateTaskDomainModel } from "../api/tasksApi.types"
import { AppDispatch, RootStateType } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import { setAppStatusAC, setAppErrorAC } from "./appSlice"
import { Respond } from "../../../common/types/types"
import { handleServerAppError } from "../../../common/utils/handleServerAppError"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"

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
    case "REMOVE-TODOLIST": {
      let copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolist.id]: [] }
    }
    case "UPDATE_TASK": {
      const newTodolistTasks = {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                ...action.payload.updates,
                // title: action.payload.title,
              }
            : t,
        ),
      }
      return newTodolistTasks
    }
    case "SET_TASKS": {
      return { ...state, [action.payload.todolistId]: action.payload.tasks }
    }
    case "LOGOUT": {
      return initState
    }

    default:
      return state
  }
}
// thunk

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      if (res.data.error === null) {
        dispatch(setAppStatusAC("succeeded"))
        const tasks = res.data.items
        dispatch(setTasksAC({ tasks, todolistId }))
      } else {
        dispatch(setAppStatusAC("failed"))
        dispatch(setAppErrorAC(res.data.error))
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const deleteTaskTC = (arg: { todolistId: string; taskId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .deleteTask(arg)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(removeTaskAC(arg))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(addTaskAC({ task: res.data.data.item }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const updateTaskTC =
  (arg: { taskId: string; todoListId: string; updates: UpdateTaskDomainModel }) =>
  (dispatch: AppDispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC("loading"))
    const { taskId, updates, todoListId } = arg

    const allTask = getState().tasks
    const tasksForCurentTodolist = allTask[todoListId]
    const task = tasksForCurentTodolist.find((e) => e.id === taskId)!

    tasksApi
      .updateTask({ task, updates })
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(updateTaskAC({ updates, todoListId: task.todoListId, taskId: task.id }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

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
export const updateTaskAC = (payload: { taskId: string; todoListId: string; updates: UpdateTaskDomainModel }) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const
}
// Actions types
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export type SetTasksAC = ReturnType<typeof setTasksAC>
type ActionsType =
  | RemoveTaskACType
  | AddTaskACType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | UpdateTaskACType
  | SetTasksAC
  | ResetStore
