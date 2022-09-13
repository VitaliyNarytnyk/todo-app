import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TodoCardComponent } from './todo-card.component';



@NgModule({
  declarations: [TodoCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [TodoCardComponent]
})
export class TodoCardModule { }
