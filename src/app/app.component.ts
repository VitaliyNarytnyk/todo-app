import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateWindowComponent } from './shared/components/create-window/create-window.component';
import { AuthService } from './shared/services/auth.service';
import { FilterEnum } from './shared/services/filter.enum';
import { TodosService } from './shared/services/todos.servics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  filterEnum = FilterEnum
  filter$!: Observable<FilterEnum>

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    private router: Router,
    private todosService: TodosService
  ) { }

  ngOnInit(): void {
    this.filter$ = this.todosService.filter$
  }

  logout() {
    event?.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateWindowComponent, {
      width: '30%'
    });
  }

  changeFilter(event: Event, filterName: FilterEnum): void {
    this.todosService.changeFilter(filterName)
  }

}
