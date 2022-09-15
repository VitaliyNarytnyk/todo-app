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
  }

  completeTodo(todo: Todo) {

    const newTodo = {
      ...todo,
      status: false,
      subtitle: 'Completed'
    }

    this.nSub = this.todosService.completeTodo(newTodo).subscribe(newTodo => {
      this.todo = newTodo
    })
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo).subscribe(() => { })
  }
}
