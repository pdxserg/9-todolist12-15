export type TodolistsType = TodolistType[]
export type TodolistType = {
	id: string,
	title: string,
	addedDate: string,
	order: number
}

export type Respond<T={}> = {
	data: T
	fieldsErrors: []
	messages: []
	resultCode: number
}