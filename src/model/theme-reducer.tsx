// @flow




export type ThemeMode = "dark"|"light"
type InitialStateType= typeof initialState
const initialState = {
themeMode:'light' as ThemeMode
}

export const themeReducer=(state:InitialStateType= initialState , action:ActionsType):InitialStateType=>{
switch (action.type) {
	case 'CHANGE_MODE':{
		return {
			...state,
			themeMode: state.themeMode === 'light' ? 'dark' : 'light',
		};
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