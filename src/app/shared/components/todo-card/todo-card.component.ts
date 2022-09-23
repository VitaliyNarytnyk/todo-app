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

  }

  ngOnDestroy(): void {
    if (this.nSub) {
      this.nSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

  completeTodo(todo: Todo) {

    const newTodo = {
      ...todo,
      status: !todo.status,
      subtitle: 'Completed'
    }

    this.nSub = this.todosService.completeTodo(newTodo).subscribe(newTodo => {
      const updatedTodos = this.todosService.todos$.getValue().filter(todo => todo.id !== newTodo.id)
      this.todosService.todos$.next(updatedTodos)
      this.todosService.todos$.getValue().unshift(newTodo)
    })
  }

  deleteTodo(id: string) {
    this.dSub = this.todosService.deleteTodo(id).subscribe(() => {
      const updatedTodos = this.todosService.todos$.getValue().filter(todo => todo.id !== id)
      this.todosService.todos$.next(updatedTodos)
    })
  }
}
