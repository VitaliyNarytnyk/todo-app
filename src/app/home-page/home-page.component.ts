import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Todo } from '../shared/interfaces';
import { TodosService } from '../shared/services/todos.servics';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  todos$!: Observable<Todo[]>

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit(): void {
    this.todos$ = this.todosService.getAll()
  }

}
