import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { FbAuthResponse, User } from "../interfaces";

@Injectable({ providedIn: 'root' })
export class AuthService {

	constructor(private http: HttpClient) { }

	get token(): string {
		return ''
	}

	login(user: User): Observable<FbAuthResponse> {
		return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(
				tap(this.setToken)
			)
	}

	isAuthenticated(): boolean {
		return !!this.token
	}

	private setToken(response: FbAuthResponse) {
		console.log(response);
	}

}