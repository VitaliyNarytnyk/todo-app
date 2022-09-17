import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../../interfaces';
import { TodosService } from '../../services/todos.servics';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit, OnDestroy {

  @Input() todo!: Todo

  nSub!: Subscription
  dSub!: Subscription

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit(): void {
    this.todosService.getAll()
  }

  ngOnDestroy(): void {
    if (this.nSub) {
      this.nSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

  completeTodo(newTodo: Todo) {

    const updatedTodo = this.todosService.todos$.getValue().map(todo => {
      if (todo.id === newTodo.id) {
        return {
          ...todo,
          status: !todo.status,
          subtitle: 'Completed'
        }
      }
      return todo
    })

    this.nSub = this.todosService.completeTodo(newTodo).subscribe(todo => {
      this.todosService.todos$.next(updatedTodo)
    })
  }

  deleteTodo(id: string) {
    this.dSub = this.todosService.deleteTodo(id).subscribe(() => {
      const updatedTodos = this.todosService.todos$.getValue().filter(todo => todo.id !== id)
      this.todosService.todos$.next(updatedTodos)
    })
  }
}
