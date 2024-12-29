import {useAppSelector} from "../common/hooks/useAppSelector";
import {RootStateType} from "./store";

export const selectThemeMode = (state: RootStateType) => state.themeMode.themeMode