import { ApiTaskType, UpdateTaskDomainModel } from "../api/tasksApi.types"
import { AppDispatch, RootStateType } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import { setAppStatus, setAppError } from "./appSlice"
import { handleServerAppError } from "../../../common/utils/handleServerAppError"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"
import { createSlice } from "@reduxjs/toolkit"
import { todolistsSlice } from "./todolistsSlice"

export type TasksStateType = {
  [key: string]: ApiTaskType[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    addTask: create.reducer<{ task: ApiTaskType }>((state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    }),
    setTasks: create.reducer<{ tasks: ApiTaskType[]; todolistId: string }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    updateTask: create.reducer<{ taskId: string; todoListId: string; updates: UpdateTaskDomainModel }>(
      (state, action) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.updates }
        }
      },
    ),
  }),
})
export const tasksReducer = tasksSlice.reducer
export const { addTask, setTasks, removeTask, updateTask } = tasksSlice.actions

const initState: TasksStateType = {}
export const _tasksReducer = (state = initState, action: any): TasksStateType => {
  switch (action.type) {
    case "todolists/removeTodolist": {
      let copyState = { ...state }
      delete copyState[action.payload.todolistId]
      return copyState
    }
    case "todolists/addTodolist": {
      return { ...state, [action.payload.todolist.id]: [] }
    }

    case "LOGOUT": {
      return initState
    }

    default:
      return state
  }
}

// Actions types
export type removeTaskType = ReturnType<typeof removeTask>
export type addTaskType = ReturnType<typeof addTask>

export type setTasks = ReturnType<typeof setTasks>
type ActionsType = removeTaskType | addTaskType | setTasks

// thunk

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      if (res.data.error === null) {
        dispatch(setAppStatus({ status: "succeeded" }))
        const tasks = res.data.items
        dispatch(setTasks({ tasks, todolistId }))
      } else {
        dispatch(setAppStatus({ status: "failed" }))
        // dispatch(setAppError(res.data.error))
        dispatch(setAppError({ error: res.data.error }))
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const deleteTaskTC = (arg: { todolistId: string; taskId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .deleteTask(arg)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTask(arg))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(addTask({ task: res.data.data.item }))
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
    dispatch(setAppStatus({ status: "loading" }))
    const { taskId, updates, todoListId } = arg

    const allTask = getState().tasks
    const tasksForCurentTodolist = allTask[todoListId]
    const task = tasksForCurentTodolist.find((e: any) => e.id === taskId)!

    tasksApi
      .updateTask({ task, updates })
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setAppStatus({ status: "succeeded" }))
          dispatch(updateTask({ updates, todoListId: task.todoListId, taskId: task.id }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
