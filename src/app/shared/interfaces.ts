export interface User {
	email: string
	password: string
	returnSecureToken?: boolean
}

export interface FbAuthResponse {
	idToken: string
	expiresIn: string
}

export interface FbCreateResponse {
	name?: string
}

export interface Todo {
	id?: string
	status: boolean
	title: string
	text: string
	subtitle: string
}