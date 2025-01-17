import Checkbox from "@mui/material/Checkbox"
import React, { ChangeEvent, useEffect, useState } from "react"

import axios from "axios"
import { TodolistsType } from "../features/todolists/api/todolistsApi.types"
import { ApiTaskType, UpdateTaskModel } from "../features/todolists/api/tasksApi.types"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { tasksApi } from "../features/todolists/api/tasksApi"

import { AddItemForm, EditableSpan } from "../common/components"
import { TaskStatus } from "../common/enums/enums"
import { Respond } from "../common/types/types"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<TodolistsType>([])
  const [tasks, setTasks] = useState<any>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
          // setTasks({...tasks, [tl.id]: res.data.items})
          setTasks((prevTasks: any) => ({
            ...prevTasks,
            [tl.id]: res.data.items,
          }))
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    // create todolist
    todolistsApi.createTodolists(title).then((res) => {
      const newTod = res.data.data.item
      // @ts-ignore
      setTodolists([newTod, ...todolists])
    })
  }

  const removeTodolistHandler = (id: string) => {
    // remove todolist
    todolistsApi.deleteTodolist(id).then((res) => {
      console.log(res.data)
      setTodolists(todolists.filter((t) => t.id !== id))
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    // update todolist title
    todolistsApi.updateTodolist({ id, title }).then((res) => {
      console.log(res.data)
      setTodolists(todolists.map((t) => (t.id === id ? { ...t, title } : t)))
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    // create task
    tasksApi.createTask({ title, todolistId }).then((res) => {
      const newTask: ApiTaskType = res.data.data.item
      const currentTasks = tasks[todolistId] || []
      setTasks({ ...tasks, [todolistId]: [newTask, ...currentTasks] })
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    // remove task
    tasksApi.deleteTask({ taskId, todolistId }).then((res) => {
      console.log(res.data)
      // @ts-ignore
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) })
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: ApiTaskType) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    // update task status
    axios
      .put<
        Respond<{ item: ApiTaskType }>
      >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model)
      .then((res) => {
        console.log(res.data.data.item)
        const newTask: ApiTaskType = res.data.data.item
        let nemTasks = tasks[task.todoListId].map((t: any) => (t.id === task.id ? newTask : t))
        setTasks({ ...tasks, [task.todoListId]: nemTasks })
      })
  }

  const changeTaskTitleHandler = (title: string, task: any) => {
    // update task title
    // tasksApi.updateTask({ title, task }).then((res) => {
    //   const task = res.data.data.item
    //   let nemTasks = tasks[task.todoListId].map((t: any) => (t.id === task.id ? task : t))
    //   setTasks({ ...tasks, [task.todoListId]: nemTasks })
    // })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl: any) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: ApiTaskType) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === 2 ? true : false}
                      onChange={(e) => changeTaskStatusHandler(e, task)}
                    />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
