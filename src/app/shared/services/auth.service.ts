import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../interfaces";

@Injectable({ providedIn: 'root' })
export class AuthService {

	constructor(private http: HttpClient) { }

	get token(): string {
		return ''
	}

	login(user: User): Observable<any> {
		return this.http.post<any>(``, user)
			.pipe(
				tap(this.setToken)
			)
	}

	isAuthenticated(): boolean {
		return !!this.token
	}

	private setToken(response: any) {
		console.log(response);
	}

}