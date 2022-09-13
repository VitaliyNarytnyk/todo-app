import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { TodoCardComponent } from './todo-card.component';
import { SharedModule } from '../../shared.module';



@NgModule({
  declarations: [TodoCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule
  ],
  exports: [TodoCardComponent]
})
export class TodoCardModule { }
