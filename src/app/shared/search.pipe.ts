import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "./interfaces";

@Pipe({
	name: 'searchTodo'
})
export class SearchPipe implements PipeTransform {
	transform(todos: Todo[], search = ''): Todo[] {
		if (!search.trim()) {
			return todos
		}
		return todos.filter(todo => {
			return todo.title.toLowerCase().includes(search.toLowerCase()) || todo.text.toLowerCase().includes(search.toLowerCase())
		})
	}
}