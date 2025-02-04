import { createTheme } from "@mui/material/styles"
import { ThemeMode } from "../../features/todolists/model/appSlice"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#087EA4",
      },
    },
  })
}
