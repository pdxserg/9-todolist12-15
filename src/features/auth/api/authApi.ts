import { Inputs } from "../ui/Login/Login"
import { instance } from "../../../common/instance"
import { Respond } from "../../../common/types/types"

export const authApi = {
  login: (args: Inputs) => {
    return instance.post<Respond<{ userId: number; token: string }>>("/auth/login", args)
  },
}
