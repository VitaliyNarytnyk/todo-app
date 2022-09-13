import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoCardComponent } from './todo-card.component';
import { SharedModule } from '../../shared.module';



@NgModule({
  declarations: [TodoCardComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TodoCardComponent]
})
export class TodoCardModule { }
