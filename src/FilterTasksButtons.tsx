// @flow
import * as React from 'react';
import Button from "@mui/material/Button";


export const FilterTasksButtons = () => {


	return (
		<>
		<Button
			variant={filter === 'all' ? 'outlined' : 'text'}
			color={'inherit'}
			onClick={() => changeFilterTasksHandler('all')}>
			All
		</Button>
		<Button
			variant={filter === 'active' ? 'outlined' : 'text'}
			color={'primary'}
			onClick={() => changeFilterTasksHandler('active')}>
			Active
		</Button>
		<Button
			variant={filter === 'completed' ? 'outlined' : 'text'}
			color={'secondary'}
			onClick={() => changeFilterTasksHandler('completed')}>
			Completed
		</Button>

		</>
	);
};