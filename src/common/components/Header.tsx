// @flow
import * as React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "./MenuButton";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import {changeModeAC} from "../../features/todolists/model/theme-reducer";
import {getTheme} from '../theme/theme';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from "../hooks/useAppSelector";
import {selectThemeMode} from "../../app/appSelectors";


export const Header = () => {
	const themeMode = useAppSelector(selectThemeMode)


	const theme = getTheme(themeMode)
	const dispatch = useAppDispatch()

	const changeModeHandler = () => {
		dispatch(changeModeAC())
	}
	return (
		<AppBar position="static" sx={{mb: '30px'}}>
			<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
				<IconButton color="inherit">
					<MenuIcon/>
				</IconButton>
				<div>
					<MenuButton>Login</MenuButton>
					<MenuButton>Logout</MenuButton>
					<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
					<Switch color={'default'} onChange={changeModeHandler}/>
				</div>
			</Toolbar>
		</AppBar>
	);
};