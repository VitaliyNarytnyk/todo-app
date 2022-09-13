import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { TodoCardModule } from '../shared/components/todo-card/todo-card.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    TodoCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [HomePageComponent]
})
export class HomePageModule { }
