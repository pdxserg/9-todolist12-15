import { Inputs } from "../ui/Login/Login"
import { instance } from "../../../common/instance"

export const authApi = {
  login: (arg: { Inputs }) => {
    return instance.post("/auth/login")
  },
}
