// @flow

import { createSlice } from "@reduxjs/toolkit"
export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
// type InitialStateType = typeof initialState
// const initialState = {
//   themeMode: "light" as ThemeMode,
//   status: "idle" as RequestStatus,
//   error: null as string | null,
// }

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
  },
  reducers: (create) => ({
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: null | string }>((state, action) => {
      state.error = action.payload.error
    }),
    changeMode: create.reducer((state, action) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light"
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectErrorSnackbar: (state) => state.error,
  },
})
export const appReducer = appSlice.reducer
export const { setAppError, changeMode, setAppStatus } = appSlice.actions
export const { selectThemeMode, selectErrorSnackbar } = appSlice.selectors
