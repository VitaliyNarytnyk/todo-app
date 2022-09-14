import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, Subscription } from 'rxjs';
import { Todo } from '../shared/interfaces';
import { FilterEnum } from '../shared/services/filter.enum';
import { TodosService } from '../shared/services/todos.servics';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  todos$!: Observable<Todo[]>

  visibleTodos$!: Observable<Todo[]>

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit(): void {
    this.visibleTodos$ = combineLatest(
      this.todos$ = this.todosService.getAll(),
      this.todosService.filter$
    ).pipe(map(([todos, filter]: [Todo[], FilterEnum]) => {
      if (filter === FilterEnum.active) {
        return todos.filter((todo) => !todo.status)
      } else if (filter === FilterEnum.completed) {
        return todos.filter((todo) => todo.status)
      }
      return todos
    }))
  }

}
