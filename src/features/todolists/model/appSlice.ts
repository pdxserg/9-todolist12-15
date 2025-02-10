// @flow

import { createSlice } from "@reduxjs/toolkit"
export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
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
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})
export const appReducer = appSlice.reducer
export const { setAppError, changeMode, setAppStatus, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectErrorSnackbar, selectIsLoggedIn } = appSlice.selectors
