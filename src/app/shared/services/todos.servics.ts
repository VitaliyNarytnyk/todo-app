import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { FbCreateResponse, Todo } from "../interfaces";

@Injectable({ providedIn: 'root' })
export class TodosService {

	constructor(private http: HttpClient) { }

	create(todo: Todo): Observable<Todo> {
		return this.http.post(`${environment.fbDbUrl}/todos.json`, todo)
			.pipe(
				map((response: FbCreateResponse) => {
					return {
						...todo,
						id: response.name
					}
				})
			)
	}

}