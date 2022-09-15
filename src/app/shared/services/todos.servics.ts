import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { FbCreateResponse, Todo } from "../interfaces";
import { FilterEnum } from "./filter.enum";

@Injectable({ providedIn: 'root' })
export class TodosService {

	filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

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

	getAll() {
		return this.http.get(`${environment.fbDbUrl}/todos.json`)
			.pipe(
				map((response: { [key: string]: any }) => {
					return Object
						.keys(response)
						.map(key => ({
							...response[key],
							id: key
						}))
				})
			)
	}

	completeTodo(todo: Todo): Observable<Todo> {
		return this.http.patch<Todo>(`${environment.fbDbUrl}/todos/${todo.id}.json`, todo)
	}

	deleteTodo(todo: Todo): Observable<void> {
		return this.http.delete<void>(`${environment.fbDbUrl}/todos/${todo.id}.json`)
	}

	changeFilter(filtername: FilterEnum): void {
		this.filter$.next(filtername)
	}

}