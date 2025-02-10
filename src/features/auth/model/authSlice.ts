import { Inputs } from "../ui/Login/Login"
import { Dispatch } from "redux"
import { setAppStatus } from "../../todolists/model/appSlice"

import { handleServerAppError } from "../../../common/utils/handleServerAppError"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"
import { resetStore } from "../../todolists/model/todolistsSlice"
import { createSlice } from "@reduxjs/toolkit"
import { _authApi } from "../api/authApi"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // isLoggedIn: false,
    isInitialized: false,
  },
  reducers: (create) => ({
    // setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
    //   state.isLoggedIn = action.payload.isLoggedIn
    // }),
    initializeApp: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
  }),
  selectors: {
    isInitializ: (state) => state.isInitialized,
    // selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const authReducer = authSlice.reducer
export const { initializeApp } = authSlice.actions
export const { isInitializ } = authSlice.selectors

// thunks
export const loginTC = (data: Inputs) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        // dispatch(setIsLoggedIn({ isLoggedIn: true }))
        localStorage.setItem("sn-token", res.data.data.token)
        dispatch(resetStore())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const logOutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _authApi
    .logOut()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        // dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
        dispatch(resetStore())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
// export const initializeAppTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({ status: "loading" }))
//   _authApi
//     .me()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(setAppStatus({ status: "succeeded" }))
//         // dispatch(setIsLoggedIn({ isLoggedIn: true }))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((err) => {
//       handleServerNetworkError(err, dispatch)
//     })
//     // .finally(() => {
//     //   dispatch(initializeApp({ isInitialized: true }))
//     // })
// }
