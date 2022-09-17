import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, delay, map, Subscription } from 'rxjs';
import { Todo } from '../shared/interfaces';
import { FilterEnum } from '../shared/services/filter.enum';
import { TodosService } from '../shared/services/todos.servics';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  allTodos$ = this.todosService.todos$.asObservable()

  tSub!: Subscription
  dASub!: Subscription
  cSub!: Subscription

  searchStr = ''

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit(): void {
    this.tSub = this.todosService.getAll()
      .subscribe(response => {
        this.todosService.todos$.next(response)
      })
    this.allTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$
    ]).pipe(map(([todos, filter]: [Todo[], FilterEnum]) => {
      if (filter === FilterEnum.active) {
        return todos.filter((todo) => todo.status)
      } else if (filter === FilterEnum.completed) {
        return todos.filter((todo) => !todo.status)
      }
      return todos
    }))
  }

  ngOnDestroy(): void {
    if (this.tSub) {
      this.tSub.unsubscribe()
    }
    if (this.dASub) {
      this.dASub.unsubscribe()
    }
    if (this.cSub) {
      this.cSub.unsubscribe()
    }
  }

  deleteAll() {
    this.dASub = this.todosService.deleteAll()
      .pipe(delay(1000))
      .subscribe(() => {
        this.todosService.todos$.next([])
      })
  }
}
