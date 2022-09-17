import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { TodoCardModule } from '../shared/components/todo-card/todo-card.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../shared/search.pipe';


@NgModule({
  declarations: [
    HomePageComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    TodoCardModule,
    SharedModule,
    FormsModule
  ],
  exports: [HomePageComponent]
})
export class HomePageModule { }
