import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { FbAuthResponse, User } from "../interfaces";

@Injectable({ providedIn: 'root' })
export class AuthService {

	constructor(private http: HttpClient) { }

	get token(): string {
		const expDate = new Date(localStorage.getItem('fb-token-exp')!)
		if (new Date() > expDate) {
			this.logout()
			return null!
		}
		return localStorage.getItem('fb-token')!
	}

	login(user: User): Observable<FbAuthResponse | null> {
		user.returnSecureToken = true
		return this.http.post<FbAuthResponse | null>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(
				tap(this.setToken)
			)
	}

	logout() {
		this.setToken(null!)
	}

	isAuthenticated(): boolean {
		return !!this.token
	}

	private setToken(response: FbAuthResponse | null) {
		if (response) {
			const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
			localStorage.setItem('fb-token', response.idToken)
			localStorage.setItem('fb-token-exp', expDate.toString())
		} else {
			localStorage.clear()
		}

	}

}