import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "../../../../common/theme/theme"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { loginTC } from "../../model/authSlice"
import { RootStateType } from "../../../../app/store"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { Path } from "../../../../common/routing/Routing"
import { selectThemeMode } from "../../../todolists/model/appSlice"

export type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}
export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state: RootStateType) => state.auth?.isLoggedIn)
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn) {
      navigate(Path.Main)
    }
  }, [isLoggedIn])

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { email: "", password: "", rememberMe: false } })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginTC(data))
    reset()
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters long",
                  },
                })}
              />
              {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
                    )}
                  />
                }
              />

              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
