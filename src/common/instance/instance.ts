import axios from "axios"
import { headersToken } from "../../app/token/token"

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
  // baseURL: "https://social-network.samuraijs.com/api/1.1",
  // headers: headersToken,
})
