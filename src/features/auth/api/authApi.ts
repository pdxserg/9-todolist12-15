import { Inputs } from "../ui/Login/Login"
import { instance } from "../../../common/instance"
import { Respond } from "../../../common/types/types"

export const authApi = {
  login: (args: Inputs) => {
    return instance.post<Respond<{ userId: number; token: string }>>("/auth/login", args)
  },
  logOut: () => {
    return instance.delete<Respond>("/auth/login")
  },
  me: () => {
    return instance.get<Respond<{ id: number; email: string; login: string }>>("/auth/me")
  },
}
