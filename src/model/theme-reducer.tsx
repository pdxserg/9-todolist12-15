// @flow


import {ThemeMode} from "../App";

export const themeReducer=(state:ThemeMode, action:ActionsType):ThemeMode=>{
switch (action.type) {
	case 'CHANGE_MODE':{
	return state
}
	default:
		return state

}
}
export const changeModeAC=()=>{
	return{
		type:'CHANGE_MODE',
		payload:{}
	}as const
}
type ChangeModeACType = ReturnType<typeof changeModeAC>

type  ActionsType= ChangeModeACType