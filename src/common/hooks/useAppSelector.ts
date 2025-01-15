import { useSelector } from "react-redux"
import { RootStateType } from "../../app/store"

export const useAppSelector = useSelector.withTypes<RootStateType>()
